import { useEffect, useState, type FormEvent } from "react"
import * as articlesApi from "../../api/articles"
import * as categoriesApi from "../../api/categories"
import type { LegalArticle, Category } from "../../types"
import { LoadingState } from "../../components/LoadingState"
import { StatusBadge } from "../../components/StatusBadge"
import { extractErrorMessage } from "../../api/client"

export function AdminArticlesPage() {
	const [articles, setArticles] = useState<LegalArticle[] | null>(null)
	const [categories, setCategories] = useState<Category[]>([])
	const [error, setError] = useState<string | null>(null)
	const [form, setForm] = useState({ title: "", categoryId: "", summary: "", content: "", author: "" })

	function load() {
		articlesApi.listArticles().then(setArticles).catch((e) => setError(extractErrorMessage(e)))
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
	}
	useEffect(load, [])

	async function onCreate(e: FormEvent) {
		e.preventDefault()
		try {
			await articlesApi.createArticle(form)
			setForm({ title: "", categoryId: "", summary: "", content: "", author: "" })
			load()
		} catch (err) { setError(extractErrorMessage(err)) }
	}

	async function onStatus(id: string, status: string) {
		try { await articlesApi.updateArticle(id, { status: status as LegalArticle["status"] }); load() } catch (err) { setError(extractErrorMessage(err)) }
	}
	async function onDelete(id: string) {
		try { await articlesApi.deleteArticle(id); load() } catch (err) { setError(extractErrorMessage(err)) }
	}

	return (
		<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Manage Legal Articles</h1>
			<p className="mt-1 text-xs text-amber-700">Articles are general-information explainers, not primary legal sources. Do not present them as official law text.</p>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			<form onSubmit={onCreate} className="card mt-6 flex flex-col gap-3">
				<p className="font-semibold text-slate-800">Add Article</p>
				<input required placeholder="Title" className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
				<div className="grid grid-cols-2 gap-3">
					<select required className="input-field" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
						<option value="">Select category</option>
						{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
					</select>
					<input placeholder="Author (optional)" className="input-field" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
				</div>
				<input required placeholder="Short summary" className="input-field" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
				<textarea required rows={4} placeholder="Full content" className="input-field" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
				<button type="submit" className="btn-primary self-start">Add Article</button>
			</form>

			{!articles ? (
				<LoadingState />
			) : (
				<div className="mt-6 flex flex-col gap-2">
					{articles.map((a) => (
						<div key={a.id} className="card flex flex-wrap items-center justify-between gap-3">
							<span className="font-medium text-slate-700">{a.title}</span>
							<div className="flex items-center gap-2">
								<StatusBadge status={a.status} />
								<select className="input-field w-auto" value={a.status} onChange={(e) => onStatus(a.id, e.target.value)}>
									{["DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => <option key={s} value={s}>{s}</option>)}
								</select>
								<button className="text-xs text-red-600" onClick={() => onDelete(a.id)}>Delete</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
