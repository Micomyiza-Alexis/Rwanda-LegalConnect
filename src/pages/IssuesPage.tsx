import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import * as issuesApi from "../api/issues"
import type { LegalIssue } from "../types"
import { IssueCard } from "../components/IssueCard"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { ErrorState } from "../components/ErrorState"
import { extractErrorMessage } from "../api/client"

const STATUSES = ["OPEN", "UNDER_REVIEW", "IN_PROGRESS", "RESOLVED", "CLOSED"]

export function IssuesPage() {
	const [params, setParams] = useSearchParams()
	const [issues, setIssues] = useState<LegalIssue[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const status = params.get("status") ?? ""

	function load() {
		setError(null)
		setIssues(null)
		issuesApi.listMyIssues(status || undefined).then(setIssues).catch((e) => setError(extractErrorMessage(e)))
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(load, [status])

	return (
		<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900">My Legal Issues</h1>
				<Link to="/issues/new" className="btn-primary">+ New issue</Link>
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				<button
					className={`badge ${status === "" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"}`}
					onClick={() => setParams(status ? {} : {})}
				>
					All
				</button>
				{STATUSES.map((s) => (
					<button
						key={s}
						className={`badge ${status === s ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"}`}
						onClick={() => setParams({ status: s })}
					>
						{s.replace(/_/g, " ")}
					</button>
				))}
			</div>
			<div className="mt-6">
				{error ? (
					<ErrorState message={error} onRetry={load} />
				) : !issues ? (
					<LoadingState />
				) : issues.length === 0 ? (
					<EmptyState title="No legal issues found." description="Create one to start tracking a legal matter." />
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{issues.map((i) => (
							<IssueCard key={i.id} issue={i} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
