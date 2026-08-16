import { useEffect, useState, type FormEvent } from "react"
import * as templatesApi from "../../api/templates"
import * as categoriesApi from "../../api/categories"
import type { DocumentTemplate, Category } from "../../types"
import { LoadingState } from "../../components/LoadingState"
import { extractErrorMessage } from "../../api/client"

const DEFAULT_DISCLAIMER =
	"This template is a general-purpose starting point, not legal advice. Have a qualified legal professional review it before use."

export function AdminTemplatesPage() {
	const [templates, setTemplates] = useState<DocumentTemplate[] | null>(null)
	const [categories, setCategories] = useState<Category[]>([])
	const [error, setError] = useState<string | null>(null)
	const [form, setForm] = useState({ title: "", description: "", categoryId: "", content: "", disclaimer: DEFAULT_DISCLAIMER })

	function load() {
		templatesApi.listTemplates().then(setTemplates).catch((e) => setError(extractErrorMessage(e)))
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
	}
	useEffect(load, [])

	async function onCreate(e: FormEvent) {
		e.preventDefault()
		try {
			await templatesApi.createTemplate(form)
			setForm({ title: "", description: "", categoryId: "", content: "", disclaimer: DEFAULT_DISCLAIMER })
			load()
		} catch (err) { setError(extractErrorMessage(err)) }
	}

	async function onDelete(id: string) {
		try { await templatesApi.deleteTemplate(id); load() } catch (err) { setError(extractErrorMessage(err)) }
	}

	return (
		<div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Manage Document Templates</h1>
			<p className="mt-1 text-xs text-amber-700">Templates must always carry a disclaimer that they are not a substitute for professional legal review.</p>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			<form onSubmit={onCreate} className="card mt-6 flex flex-col gap-3">
				<p className="font-semibold text-slate-800">Add Template</p>
				<input required placeholder="Title" className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
				<select required className="input-field" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
					<option value="">Select category</option>
					{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
				</select>
				<input required placeholder="Short description" className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
				<textarea required rows={4} placeholder="Template content" className="input-field" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
				<textarea required rows={2} placeholder="Disclaimer" className="input-field" value={form.disclaimer} onChange={(e) => setForm({ ...form, disclaimer: e.target.value })} />
				<button type="submit" className="btn-primary self-start">Add Template</button>
			</form>

			{!templates ? (
				<LoadingState />
			) : (
				<div className="mt-6 flex flex-col gap-2">
					{templates.map((t) => (
						<div key={t.id} className="card flex flex-wrap items-center justify-between gap-3">
							<span className="font-medium text-slate-700">{t.title}</span>
							<button className="text-xs text-red-600" onClick={() => onDelete(t.id)}>Delete</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
