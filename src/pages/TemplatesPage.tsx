import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as templatesApi from "../api/templates"
import type { DocumentTemplate } from "../types"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { extractErrorMessage } from "../api/client"

export function TemplatesPage() {
	const [templates, setTemplates] = useState<DocumentTemplate[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		templatesApi.listTemplates().then(setTemplates).catch((e) => setError(extractErrorMessage(e)))
	}, [])

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Document Templates</h1>
			<p className="mt-1 text-sm text-slate-500">General-purpose templates. Review with a legal professional before use.</p>
			<div className="mt-6">
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!templates ? (
					<LoadingState />
				) : templates.length === 0 ? (
					<EmptyState title="No templates available yet." />
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{templates.map((t) => (
							<Link key={t.id} to={`/templates/${t.id}`} className="card hover:border-brand-300 hover:shadow-md">
								<p className="font-semibold text-slate-800">{t.title}</p>
								<p className="mt-1 line-clamp-2 text-sm text-slate-500">{t.description}</p>
								<p className="mt-2 text-xs text-slate-400">{t.category?.name}</p>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
