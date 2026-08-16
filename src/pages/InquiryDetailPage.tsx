import { useEffect, useState, type FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import * as inquiriesApi from "../api/inquiries"
import type { ProfessionalInquiry } from "../types"
import { LoadingState } from "../components/LoadingState"
import { ErrorState } from "../components/ErrorState"
import { StatusBadge } from "../components/StatusBadge"
import { useAuth } from "../context/AuthContext"
import { extractErrorMessage } from "../api/client"

const STATUSES = ["PENDING", "ACCEPTED", "IN_PROGRESS", "RESOLVED", "DECLINED"]

export function InquiryDetailPage() {
	const { id } = useParams<{ id: string }>()
	const { user } = useAuth()
	const [inquiry, setInquiry] = useState<ProfessionalInquiry | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [response, setResponse] = useState("")
	const [saving, setSaving] = useState(false)

	function load() {
		if (!id) return
		setError(null)
		inquiriesApi.getInquiry(id).then((i) => {
			setInquiry(i)
			setResponse(i.response ?? "")
		}).catch((e) => setError(extractErrorMessage(e)))
	}
	useEffect(load, [id])

	async function onRespond(e: FormEvent, status?: string) {
		e.preventDefault()
		if (!id) return
		setSaving(true)
		try {
			await inquiriesApi.respond(id, { response, status })
			load()
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setSaving(false)
		}
	}

	if (error) return <div className="mx-auto max-w-3xl px-4 py-10"><ErrorState message={error} onRetry={load} /></div>
	if (!inquiry) return <LoadingState />

	const isProfessional = user?.legalProfessional?.id === inquiry.professionalId

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<Link to={isProfessional ? "/professional/dashboard" : "/inquiries"} className="text-sm text-brand-600">&larr; Back</Link>
			<div className="mt-3 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900">{inquiry.subject}</h1>
				<StatusBadge status={inquiry.status} />
			</div>
			<p className="mt-2 text-sm text-slate-500">
				{isProfessional ? `From: ${inquiry.user?.profile?.fullName ?? inquiry.user?.email}` : `To: ${inquiry.professional?.fullName}`}
			</p>
			<div className="card mt-4">
				<p className="text-sm font-semibold text-slate-700">Description</p>
				<p className="mt-1 text-sm text-slate-600">{inquiry.description}</p>
			</div>

			{isProfessional ? (
				<form onSubmit={(e) => onRespond(e)} className="card mt-4 flex flex-col gap-3">
					<label className="label">Your response</label>
					<textarea rows={4} className="input-field" value={response} onChange={(e) => setResponse(e.target.value)} />
					<div className="flex flex-wrap gap-2">
						{STATUSES.map((s) => (
							<button key={s} type="button" disabled={saving} className="btn-secondary" onClick={(e) => onRespond(e, s)}>
								Set {s.replace(/_/g, " ")}
							</button>
						))}
					</div>
				</form>
			) : (
				inquiry.response && (
					<div className="card mt-4">
						<p className="text-sm font-semibold text-slate-700">Response</p>
						<p className="mt-1 text-sm text-slate-600">{inquiry.response}</p>
					</div>
				)
			)}
		</div>
	)
}
