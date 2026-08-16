import { useEffect, useState, type FormEvent } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import * as issuesApi from "../api/issues"
import * as categoriesApi from "../api/categories"
import type { Category } from "../types"
import { extractErrorMessage } from "../api/client"

export function NewIssuePage() {
	const navigate = useNavigate()
	const [params] = useSearchParams()
	const [categories, setCategories] = useState<Category[]>([])
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [categoryId, setCategoryId] = useState(params.get("categoryId") ?? "")
	const [priority, setPriority] = useState("MEDIUM")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
	}, [])

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			const resourceId = params.get("resourceId")
			const issue = await issuesApi.createIssue({
				title,
				description,
				categoryId: categoryId || null,
				priority,
				relatedResourceIds: resourceId ? [resourceId] : undefined,
			})
			navigate(`/issues/${issue.id}`)
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Track a New Legal Issue</h1>
			<p className="mt-1 text-sm text-slate-500">Describe your situation so you (and a legal professional, if you reach out) can track its progress.</p>
			<form onSubmit={onSubmit} className="card mt-6 flex flex-col gap-4">
				{error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
				<div>
					<label className="label">Title</label>
					<input required className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Unpaid salary from employer" />
				</div>
				<div>
					<label className="label">Description</label>
					<textarea required rows={5} className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div>
						<label className="label">Category</label>
						<select className="input-field" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
							<option value="">Uncategorized</option>
							{categories.map((c) => (
								<option key={c.id} value={c.id}>{c.name}</option>
							))}
						</select>
					</div>
					<div>
						<label className="label">Priority</label>
						<select className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
							{["LOW", "MEDIUM", "HIGH", "URGENT"].map((p) => (
								<option key={p} value={p}>{p}</option>
							))}
						</select>
					</div>
				</div>
				<button type="submit" disabled={loading} className="btn-primary self-start">{loading ? "Creating..." : "Create Issue"}</button>
			</form>
		</div>
	)
}
