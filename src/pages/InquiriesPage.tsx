import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as inquiriesApi from "../api/inquiries"
import type { ProfessionalInquiry } from "../types"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { ErrorState } from "../components/ErrorState"
import { StatusBadge } from "../components/StatusBadge"
import { extractErrorMessage } from "../api/client"

export function InquiriesPage() {
	const [inquiries, setInquiries] = useState<ProfessionalInquiry[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	function load() {
		setError(null)
		inquiriesApi.listMyInquiries().then(setInquiries).catch((e) => setError(extractErrorMessage(e)))
	}
	useEffect(load, [])

	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">My Inquiries</h1>
			<div className="mt-6">
				{error ? (
					<ErrorState message={error} onRetry={load} />
				) : !inquiries ? (
					<LoadingState />
				) : inquiries.length === 0 ? (
					<EmptyState title="No inquiries yet." description="Contact a legal professional from their profile page." />
				) : (
					<div className="flex flex-col gap-2">
						{inquiries.map((inq) => (
							<Link key={inq.id} to={`/inquiries/${inq.id}`} className="card flex items-center justify-between py-3">
								<div>
									<p className="font-medium text-slate-700">{inq.subject}</p>
									<p className="text-xs text-slate-400">To: {inq.professional?.fullName}</p>
								</div>
								<StatusBadge status={inq.status} />
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
