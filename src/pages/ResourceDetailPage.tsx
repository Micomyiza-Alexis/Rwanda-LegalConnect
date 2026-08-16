import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as resourcesApi from "../api/resources"
import * as savedApi from "../api/savedResources"
import type { LegalResource } from "../types"
import { LoadingState } from "../components/LoadingState"
import { ErrorState } from "../components/ErrorState"
import { DemoBadge } from "../components/DemoBadge"
import { useAuth } from "../context/AuthContext"
import { extractErrorMessage } from "../api/client"

export function ResourceDetailPage() {
	const { id } = useParams<{ id: string }>()
	const { user } = useAuth()
	const [resource, setResource] = useState<LegalResource | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [saveMsg, setSaveMsg] = useState<string | null>(null)

	function load() {
		if (!id) return
		setError(null)
		setResource(null)
		resourcesApi.getResource(id).then(setResource).catch((e) => setError(extractErrorMessage(e)))
	}

	useEffect(load, [id])

	async function onSave() {
		if (!id) return
		try {
			await savedApi.saveResource(id)
			setSaveMsg("Saved to your resources.")
		} catch (e) {
			setSaveMsg(extractErrorMessage(e))
		}
	}

	if (error) return <div className="mx-auto max-w-3xl px-4 py-10"><ErrorState message={error} onRetry={load} /></div>
	if (!resource) return <LoadingState />

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<Link to="/library" className="text-sm text-brand-600">&larr; Back to Library</Link>
			<div className="mt-4 flex flex-wrap items-center gap-2">
				<span className="badge bg-brand-50 text-brand-700">{resource.documentType.replace(/_/g, " ")}</span>
				{resource.isDemoData && <DemoBadge />}
			</div>
			<h1 className="mt-3 text-2xl font-bold text-slate-900">{resource.title}</h1>
			<p className="mt-2 text-slate-600">{resource.description}</p>

			<div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
				<div><p className="text-slate-400">Category</p><p className="font-medium text-slate-700">{resource.category?.name}</p></div>
				<div><p className="text-slate-400">Source</p><p className="font-medium text-slate-700">{resource.source}</p></div>
				<div><p className="text-slate-400">Reference</p><p className="font-medium text-slate-700">{resource.referenceNumber ?? "\u2014"}</p></div>
				<div><p className="text-slate-400">Effective</p><p className="font-medium text-slate-700">{resource.effectiveDate?.slice(0, 10) ?? "\u2014"}</p></div>
			</div>

			{resource.isDemoData && (
				<p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
					DEMO DATA \u2014 Replace with verified official source. This content is for demonstration only and has not been verified against an official Rwandan legal source.
				</p>
			)}

			<div className="prose prose-sm mt-6 max-w-none whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-5">{resource.content}</div>

			{resource.sourceUrl && (
				<a href={resource.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-brand-600">View original source \u2197</a>
			)}

			{user && (
				<div className="mt-6 flex items-center gap-3">
					<button className="btn-secondary" onClick={onSave}>Save resource</button>
					<Link to={`/issues/new?resourceId=${resource.id}&categoryId=${resource.categoryId}`} className="btn-primary">Track a related issue</Link>
					{saveMsg && <span className="text-sm text-slate-500">{saveMsg}</span>}
				</div>
			)}
		</div>
	)
}
