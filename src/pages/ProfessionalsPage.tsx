import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as professionalsApi from "../api/professionals"
import type { LegalProfessional } from "../types"
import { ProfessionalCard } from "../components/ProfessionalCard"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { ErrorState } from "../components/ErrorState"
import { extractErrorMessage } from "../api/client"

export function ProfessionalsPage() {
	const [params, setParams] = useSearchParams()
	const [pros, setPros] = useState<LegalProfessional[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [q, setQ] = useState(params.get("q") ?? "")

	function load() {
		setError(null)
		setPros(null)
		professionalsApi
			.searchProfessionals({ q: params.get("q") || undefined, specialization: params.get("specialization") || undefined, page: 1, pageSize: 20 })
			.then((r) => setPros(r.items))
			.catch((e) => setError(extractErrorMessage(e)))
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(load, [params.toString()])

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Legal Professionals</h1>
			<p className="mt-1 text-sm text-slate-500">Find verified legal professionals by name, specialization, or location.</p>
			<form
				className="mt-6 flex gap-3"
				onSubmit={(e) => {
					e.preventDefault()
					const next = new URLSearchParams(params)
					if (q) next.set("q", q)
					else next.delete("q")
					setParams(next)
				}}
			>
				<input className="input-field flex-1" placeholder="Search by name, specialization, location..." value={q} onChange={(e) => setQ(e.target.value)} />
				<button type="submit" className="btn-primary">Search</button>
			</form>
			<div className="mt-8">
				{error ? (
					<ErrorState message={error} onRetry={load} />
				) : !pros ? (
					<LoadingState />
				) : pros.length === 0 ? (
					<EmptyState title="No professionals found." description="Try a different search." />
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{pros.map((p) => (
							<ProfessionalCard key={p.id} professional={p} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
