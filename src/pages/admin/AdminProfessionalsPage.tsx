import { useEffect, useState } from "react"
import * as professionalsApi from "../../api/professionals"
import type { LegalProfessional } from "../../types"
import { LoadingState } from "../../components/LoadingState"
import { StatusBadge } from "../../components/StatusBadge"
import { extractErrorMessage } from "../../api/client"

export function AdminProfessionalsPage() {
	const [pros, setPros] = useState<LegalProfessional[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	function load() {
		professionalsApi.listAllAdmin().then(setPros).catch((e) => setError(extractErrorMessage(e)))
	}
	useEffect(load, [])

	async function onVerify(id: string, status: string) {
		try { await professionalsApi.setVerification(id, status); load() } catch (e) { setError(extractErrorMessage(e)) }
	}
	async function onSuspend(id: string, isSuspended: boolean) {
		try { await professionalsApi.setSuspended(id, isSuspended); load() } catch (e) { setError(extractErrorMessage(e)) }
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Manage Legal Professionals</h1>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			{!pros ? (
				<LoadingState />
			) : (
				<div className="mt-6 flex flex-col gap-2">
					{pros.map((p) => (
						<div key={p.id} className="card flex flex-wrap items-center justify-between gap-3">
							<div>
								<p className="font-medium text-slate-700">{p.fullName}</p>
								<p className="text-xs text-slate-400">{p.professionalTitle} \u00b7 {p.location}</p>
							</div>
							<div className="flex items-center gap-2">
								<StatusBadge status={p.verificationStatus} />
								{p.isSuspended && <span className="badge bg-red-100 text-red-700">Suspended</span>}
								<select className="input-field w-auto" value={p.verificationStatus} onChange={(e) => onVerify(p.id, e.target.value)}>
									{["UNVERIFIED", "PENDING", "VERIFIED", "REJECTED"].map((s) => <option key={s} value={s}>{s}</option>)}
								</select>
								<button className="btn-secondary" onClick={() => onSuspend(p.id, !p.isSuspended)}>
									{p.isSuspended ? "Unsuspend" : "Suspend"}
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
