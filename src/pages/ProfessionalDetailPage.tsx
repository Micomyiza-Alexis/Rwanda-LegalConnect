import { useEffect, useState, type FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import * as professionalsApi from "../api/professionals"
import * as inquiriesApi from "../api/inquiries"
import type { LegalProfessional } from "../types"
import { LoadingState } from "../components/LoadingState"
import { ErrorState } from "../components/ErrorState"
import { StatusBadge } from "../components/StatusBadge"
import { useAuth } from "../context/AuthContext"
import { extractErrorMessage } from "../api/client"

export function ProfessionalDetailPage() {
	const { id } = useParams<{ id: string }>()
	const { user } = useAuth()
	const [pro, setPro] = useState<LegalProfessional | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [subject, setSubject] = useState("")
	const [description, setDescription] = useState("")
	const [sending, setSending] = useState(false)
	const [sent, setSent] = useState(false)

	function load() {
		if (!id) return
		setError(null)
		professionalsApi.getProfessional(id).then(setPro).catch((e) => setError(extractErrorMessage(e)))
	}
	useEffect(load, [id])

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		if (!id) return
		setSending(true)
		setError(null)
		try {
			await inquiriesApi.createInquiry({ professionalId: id, subject, description })
			setSent(true)
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setSending(false)
		}
	}

	if (error && !pro) return <div className="mx-auto max-w-3xl px-4 py-10"><ErrorState message={error} onRetry={load} /></div>
	if (!pro) return <LoadingState />

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<Link to="/professionals" className="text-sm text-brand-600">&larr; Back to Professionals</Link>
			<div className="mt-3 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900">{pro.fullName}</h1>
				<StatusBadge status={pro.verificationStatus} />
			</div>
			<p className="mt-1 text-slate-600">{pro.professionalTitle} \u00b7 {pro.location}</p>
			<div className="mt-3 flex flex-wrap gap-1">
				{pro.specializations.map((s) => (
					<span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>
				))}
			</div>
			<p className="mt-4 text-sm text-slate-600">{pro.bio}</p>
			<div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
				<div><p className="text-slate-400">Experience</p><p className="font-medium text-slate-700">{pro.yearsOfExperience} years</p></div>
				<div><p className="text-slate-400">Languages</p><p className="font-medium text-slate-700">{pro.languages.join(", ")}</p></div>
				<div><p className="text-slate-400">Availability</p><p className="font-medium text-slate-700">{pro.availability}</p></div>
			</div>

			<div className="mt-8 card">
				<p className="mb-3 font-semibold text-slate-800">Send an inquiry</p>
				{!user ? (
					<p className="text-sm text-slate-500">
						<Link to="/login" className="text-brand-600">Log in</Link> to contact this legal professional.
					</p>
				) : sent ? (
					<p className="text-sm text-green-700">Your inquiry was sent. Track its progress from <Link to="/inquiries" className="font-medium">My Inquiries</Link>.</p>
				) : (
					<form onSubmit={onSubmit} className="flex flex-col gap-3">
						{error && <p className="text-sm text-red-600">{error}</p>}
						<input required className="input-field" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
						<textarea required rows={4} className="input-field" placeholder="Describe what you need help with" value={description} onChange={(e) => setDescription(e.target.value)} />
						<button type="submit" disabled={sending} className="btn-primary self-start">{sending ? "Sending..." : "Send Inquiry"}</button>
					</form>
				)}
			</div>
		</div>
	)
}
