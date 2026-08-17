import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter, X } from "lucide-react"
import * as resourcesApi from "../api/resources"
import * as categoriesApi from "../api/categories"
import * as savedApi from "../api/savedResources"
import type { LegalResource, Category } from "../types"
import { ErrorState } from "../components/ErrorState"
import { EmptyState } from "../components/EmptyState"
import { extractErrorMessage } from "../api/client"
import { LegalLibraryHeader } from "../components/library/LegalLibraryHeader"
import { LegalCategoryNav } from "../components/library/LegalCategoryNav"
import { LegalFilters } from "../components/library/LegalFilters"
import { LegalDocumentCard } from "../components/library/LegalDocumentCard"
import { LegalLibrarySkeleton } from "../components/library/LegalLibrarySkeleton"
// TEMP: no auth hook wired yet — replace with your real one
function useAuth() {
	return { user: null as null | { id: string } }
}

const PAGE_SIZE = 12

export function LibraryPage() {
	const [params, setParams] = useSearchParams()
	const [categories, setCategories] = useState<Category[]>([])
	const [resources, setResources] = useState<LegalResource[] | null>(null)
	const [total, setTotal] = useState(0)
	const [error, setError] = useState<string | null>(null)
	const [q, setQ] = useState(params.get("q") ?? "")
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

	const { user } = useAuth()

	const categoryId = params.get("categoryId") ?? ""
	const documentType = params.get("documentType") ?? ""
	const year = params.get("year") ?? ""
	const source = params.get("source") ?? ""
	const page = Number(params.get("page") ?? "1")

	useEffect(() => {
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
	}, [])

	useEffect(() => {
		if (!user) {
			setSavedIds(new Set())
			return
		}
		savedApi
			.listSaved()
			.then((items) => setSavedIds(new Set(items.map((s) => s.resourceId))))
			.catch(() => setSavedIds(new Set()))
	}, [user])

	function load() {
		setError(null)
		setResources(null)
		resourcesApi
			.searchResources({
				q: params.get("q") || undefined,
				categoryId: categoryId || undefined,
				documentType: documentType || undefined,
				year: year || undefined,
				source: source || undefined,
				page,
				pageSize: PAGE_SIZE,
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

	function clearFilters() {
		const next = new URLSearchParams(params)
		;["categoryId", "documentType", "year", "source", "page"].forEach((k) => next.delete(k))
		setParams(next)
	}

	async function toggleSave(resource: LegalResource) {
		if (!user) return
		const wasSaved = savedIds.has(resource.id)
		setSavedIds((prev) => {
			const next = new Set(prev)
			wasSaved ? next.delete(resource.id) : next.add(resource.id)
			return next
		})
		try {
			if (wasSaved) await savedApi.removeSaved(resource.id)
			else await savedApi.saveResource(resource.id)
		} catch {
			// revert on failure
			setSavedIds((prev) => {
				const next = new Set(prev)
				wasSaved ? next.add(resource.id) : next.delete(resource.id)
				return next
			})
		}
	}

	const hasActiveFilters = Boolean(categoryId || documentType || year || source)

	const filterPanel = (
		<LegalFilters
			documentType={documentType}
			year={year}
			source={source}
			onChangeDocumentType={(v) => updateParam("documentType", v)}
			onChangeYear={(v) => updateParam("year", v)}
			onChangeSource={(v) => updateParam("source", v)}
			onClear={clearFilters}
		/>
	)

	return (
		<div>
			<LegalLibraryHeader
				q={q}
				onChangeQ={setQ}
				onSubmit={(e) => {
					e.preventDefault()
					updateParam("q", q)
				}}
			/>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
				<div className="mb-6">
					<LegalCategoryNav
						categories={categories}
						activeId={categoryId}
						onSelect={(id) => updateParam("categoryId", id)}
					/>
				</div>

				<div className="flex gap-8">
					{/* Desktop sidebar */}
					<aside className="hidden w-64 shrink-0 lg:block">
						<div className="card sticky top-6">{filterPanel}</div>
					</aside>

					<div className="min-w-0 flex-1">
						<div className="mb-4 flex items-center justify-between">
							<p className="text-sm text-slate-500">
								{resources ? `${total} document${total === 1 ? "" : "s"} found` : "Searching..."}
							</p>
							<button
								type="button"
								onClick={() => setFiltersOpen(true)}
								className="btn-secondary gap-2 lg:hidden"
							>
								<Filter className="h-4 w-4" />
								Filters
								{hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />}
							</button>
						</div>

						{error ? (
							<ErrorState message={error} onRetry={load} />
						) : !resources ? (
							<LegalLibrarySkeleton />
						) : resources.length === 0 ? (
							<EmptyState
								title="No legal documents found"
								description="Try searching with a different keyword or adjusting your filters."
								action={
									hasActiveFilters ? (
										<button className="btn-secondary" onClick={clearFilters}>
											Clear filters
										</button>
									) : undefined
								}
							/>
						) : (
							<>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
									{resources.map((r) => (
										<LegalDocumentCard
											key={r.id}
											resource={r}
											isSaved={user ? savedIds.has(r.id) : undefined}
											onToggleSave={user ? toggleSave : undefined}
										/>
									))}
								</div>
								<div className="mt-8 flex justify-center gap-2">
									<button className="btn-secondary" disabled={page <= 1} onClick={() => updateParam("page", String(page - 1))}>
										Previous
									</button>
									<span className="px-3 py-2 text-sm text-slate-500">Page {page}</span>
									<button
										className="btn-secondary"
										disabled={resources.length < PAGE_SIZE}
										onClick={() => updateParam("page", String(page + 1))}
									>
										Next
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Mobile filter drawer */}
			{filtersOpen && (
				<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
					<div className="absolute inset-0 bg-slate-900/40" onClick={() => setFiltersOpen(false)} />
					<div className="absolute inset-y-0 right-0 w-full max-w-xs overflow-y-auto bg-white p-5 shadow-xl">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-base font-semibold text-slate-900">Filters</h2>
							<button
								type="button"
								onClick={() => setFiltersOpen(false)}
								aria-label="Close filters"
								className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						{filterPanel}
						<button type="button" className="btn-primary mt-6 w-full" onClick={() => setFiltersOpen(false)}>
							Show results
						</button>
					</div>
				</div>
			)}
		</div>
	)
}