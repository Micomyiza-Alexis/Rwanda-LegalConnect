import { useEffect, useState, type FormEvent } from "react"
import * as categoriesApi from "../../api/categories"
import type { Category } from "../../types"
import { LoadingState } from "../../components/LoadingState"
import { extractErrorMessage } from "../../api/client"

export function AdminCategoriesPage() {
	const [categories, setCategories] = useState<Category[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [icon, setIcon] = useState("\u2696\ufe0f")

	function load() {
		categoriesApi.listCategories().then(setCategories).catch((e) => setError(extractErrorMessage(e)))
	}
	useEffect(load, [])

	async function onCreate(e: FormEvent) {
		e.preventDefault()
		try {
			await categoriesApi.createCategory({ name, description, icon })
			setName(""); setDescription("")
			load()
		} catch (err) { setError(extractErrorMessage(err)) }
	}

	async function onDelete(id: string) {
		try { await categoriesApi.deleteCategory(id); load() } catch (err) { setError(extractErrorMessage(err)) }
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Manage Categories</h1>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			<form onSubmit={onCreate} className="card mt-6 flex flex-wrap items-end gap-3">
				<div className="w-16"><label className="label">Icon</label><input className="input-field" value={icon} onChange={(e) => setIcon(e.target.value)} /></div>
				<div className="flex-1"><label className="label">Name</label><input required className="input-field" value={name} onChange={(e) => setName(e.target.value)} /></div>
				<div className="flex-1"><label className="label">Description</label><input required className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
				<button type="submit" className="btn-primary">Add Category</button>
			</form>
			{!categories ? (
				<LoadingState />
			) : (
				<div className="mt-6 flex flex-col gap-2">
					{categories.map((c) => (
						<div key={c.id} className="card flex items-center justify-between">
							<span>{c.icon} {c.name}</span>
							<button className="text-xs text-red-600" onClick={() => onDelete(c.id)}>Delete</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
