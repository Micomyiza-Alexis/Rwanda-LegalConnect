import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as resourcesApi from "../api/resources"
import * as categoriesApi from "../api/categories"
import type { LegalResource, Category } from "../types"
import { ResourceCard } from "../components/ResourceCard"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { ErrorState } from "../components/ErrorState"
import { extractErrorMessage } from "../api/client"

const DOCUMENT_TYPES = ["LAW", "REGULATION", "PRESIDENTIAL_ORDER", "MINISTERIAL_ORDER", "LEGAL_ARTICLE", "GUIDELINE", "PUBLIC_LEGAL_RESOURCE"]

export function LibraryPage() {
	const [params, setParams] = useSearchParams()
	const [categories, setCategories] = useState<Category[]>([])
	const [resources, setResources] = useState<LegalResource[] | null>(null)
	const [total, setTotal] = useState(0)
	const [error, setError] = useState<string | null>(null)
	const [q, setQ] = useState(params.get("q") ?? "")

	const categoryId = params.get("categoryId") ?? ""
	const documentType = params.get("documentType") ?? ""
	const page = Number(params.get("page") ?? "1")

	useEffect(() => {
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
	}, [])

	function load() {
		setError(null)
		setResources(null)
		resourcesApi
			.searchResources({
				q: params.get("q") || undefined,
				categoryId: categoryId || undefined,
				documentType: documentType || undefined,
				page,
				pageSize: 12,
			})
			.then((r) => {
				setResources(r.items)
				setTotal(r.pagination.total)
			})
			.catch((e) => setError(extractErrorMessage(e)))
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(load, [params.toString()])

	function updateParam(key: string, value: string) {
		const next = new URLSearchParams(params)
		if (value) next.set(key, value)
		else next.delete(key)
		next.delete("page")
		setParams(next)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Legal Library</h1>
			<p className="mt-1 text-sm text-slate-500">Search organized legal information from the database. Results are never hardcoded.</p>

			<form
				className="mt-6 flex flex-col gap-3 sm:flex-row"
				onSubmit={(e) => {
					e.preventDefault()
					updateParam("q", q)
				}}
			>
				<input
					className="input-field flex-1"
					placeholder="Search: unpaid salary, tenant rights, land dispute..."
					value={q}
					onChange={(e) => setQ(e.target.value)}
				/>
				<button type="submit" className="btn-primary">Search</button>
			</form>

			<div className="mt-4 flex flex-wrap gap-3">
				<select className="input-field w-auto" value={categoryId} onChange={(e) => updateParam("categoryId", e.target.value)}>
					<option value="">All categories</option>
					{categories.map((c) => (
						<option key={c.id} value={c.id}>{c.name}</option>
					))}
				</select>
				<select className="input-field w-auto" value={documentType} onChange={(e) => updateParam("documentType", e.target.value)}>
					<option value="">All document types</option>
					{DOCUMENT_TYPES.map((t) => (
						<option key={t} value={t}>{t.replace(/_/g, " ")}</option>
					))}
				</select>
			</div>

			<div className="mt-8">
				{error ? (
					<ErrorState message={error} onRetry={load} />
				) : !resources ? (
					<LoadingState />
				) : resources.length === 0 ? (
					<EmptyState title="No resources found." description="Try a different search term or filter." />
				) : (
					<>
						<p className="mb-3 text-sm text-slate-500">{total} result{total === 1 ? "" : "s"}</p>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{resources.map((r) => (
								<ResourceCard key={r.id} resource={r} />
							))}
						</div>
						<div className="mt-6 flex justify-center gap-2">
							<button className="btn-secondary" disabled={page <= 1} onClick={() => updateParam("page", String(page - 1))}>Previous</button>
							<span className="px-3 py-2 text-sm text-slate-500">Page {page}</span>
							<button className="btn-secondary" disabled={resources.length < 12} onClick={() => updateParam("page", String(page + 1))}>Next</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
