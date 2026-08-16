import { Link } from "react-router-dom"
import type { LegalIssue } from "../types"
import { StatusBadge } from "./StatusBadge"

export function IssueCard({ issue }: { issue: LegalIssue }) {
	return (
		<Link to={`/issues/${issue.id}`} className="card flex flex-col gap-2 hover:border-brand-300 hover:shadow-md">
			<div className="flex items-center justify-between">
				<p className="font-semibold text-slate-800">{issue.title}</p>
				<StatusBadge status={issue.status} />
			</div>
			<p className="line-clamp-2 text-sm text-slate-500">{issue.description}</p>
			<div className="flex items-center justify-between text-xs text-slate-400">
				<span>{issue.category?.name ?? "Uncategorized"}</span>
				<StatusBadge status={issue.priority} />
			</div>
		</Link>
	)
}
