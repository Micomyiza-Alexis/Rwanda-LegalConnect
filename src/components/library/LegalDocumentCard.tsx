import { Link } from "react-router-dom"
import { Bookmark, BookmarkCheck } from "lucide-react"
import type { LegalResource } from "../../types"
import { DemoBadge } from "../DemoBadge"

function formatDate(d?: string | null) {
	if (!d) return null
	try {
		return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
	} catch {
		return null
	}
}

export function LegalDocumentCard({
	resource,
	isSaved,
	onToggleSave,
}: {
	resource: LegalResource
	isSaved?: boolean
	onToggleSave?: (resource: LegalResource) => void
}) {
	const published = formatDate(resource.publicationDate)

	return (
		<div className="card flex flex-col gap-3 transition-shadow hover:shadow-md">
			<div className="flex items-start justify-between gap-2">
				<div className="flex flex-wrap items-center gap-2">
					<span className="badge bg-brand-50 text-brand-700">{resource.documentType.replace(/_/g, " ")}</span>
					{resource.referenceNumber && (
						<span className="text-xs font-medium text-slate-400">{resource.referenceNumber}</span>
					)}
					{resource.isDemoData && <DemoBadge />}
				</div>
				{onToggleSave && (
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault()
							onToggleSave(resource)
						}}
						aria-label={isSaved ? "Remove from saved laws" : "Save this document"}
						aria-pressed={isSaved}
						className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600"
					>
						{isSaved ? <BookmarkCheck className="h-5 w-5 text-brand-600" /> : <Bookmark className="h-5 w-5" />}
					</button>
				)}
			</div>

			<Link to={`/library/${resource.id}`} className="group">
				<p className="font-semibold text-slate-900 group-hover:text-brand-700">{resource.title}</p>
				<p className="mt-1 line-clamp-2 text-sm text-slate-500">{resource.description}</p>
			</Link>

			<div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-400">
				{resource.category?.name && <span>{resource.category.name}</span>}
				{resource.source && <span>{resource.source}</span>}
				{published && <span>Published {published}</span>}
			</div>

			<div className="flex gap-2 pt-1">
				<Link to={`/library/${resource.id}`} className="btn-secondary flex-1 text-center">
					View
				</Link>
				{resource.sourceUrl && (
					<a href={resource.sourceUrl} target="_blank" rel="noreferrer" className="btn-secondary flex-1 text-center">
						Source
					</a>
				)}
			</div>
		</div>
	)
}