import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as templatesApi from "../api/templates"
import type { DocumentTemplate } from "../types"
import { LoadingState } from "../components/LoadingState"
import { ErrorState } from "../components/ErrorState"
import { extractErrorMessage } from "../api/client"

export function TemplateDetailPage() {
	const { id } = useParams<{ id: string }>()
	const [template, setTemplate] = useState<DocumentTemplate | null>(null)
	const [error, setError] = useState<string | null>(null)

	function load() {
		if (!id) return
		templatesApi.getTemplate(id).then(setTemplate).catch((e) => setError(extractErrorMessage(e)))
	}
	useEffect(load, [id])

	if (error) return <div className="mx-auto max-w-3xl px-4 py-10"><ErrorState message={error} onRetry={load} /></div>
	if (!template) return <LoadingState />

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<Link to="/templates" className="text-sm text-brand-600">&larr; Back to Templates</Link>
			<h1 className="mt-3 text-2xl font-bold text-slate-900">{template.title}</h1>
			<p className="mt-2 text-slate-600">{template.description}</p>
			<p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">{template.disclaimer}</p>
			<pre className="prose prose-sm mt-6 max-w-none whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-5 font-sans">{template.content}</pre>
		</div>
	)
}
