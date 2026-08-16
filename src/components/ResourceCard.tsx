import { Link } from "react-router-dom"
import type { LegalResource } from "../types"
import { DemoBadge } from "./DemoBadge"

export function ResourceCard({ resource }: { resource: LegalResource }) {
	return (
		<Link to={`/library/${resource.id}`} className="card flex flex-col gap-2 hover:border-brand-300 hover:shadow-md">
			<div className="flex items-center justify-between gap-2">
				<span className="badge bg-brand-50 text-brand-700">{resource.documentType.replace(/_/g, " ")}</span>
				{resource.isDemoData && <DemoBadge />}
			</div>
			<p className="font-semibold text-slate-800">{resource.title}</p>
			<p className="line-clamp-2 text-sm text-slate-500">{resource.description}</p>
			<div className="flex items-center justify-between text-xs text-slate-400">
				<span>{resource.category?.name}</span>
				<span>{resource.source}</span>
			</div>
		</Link>
	)
}
