import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as categoriesApi from "../api/categories"
import * as resourcesApi from "../api/resources"
import type { Category, LegalResource } from "../types"
import { CategoryCard } from "../components/CategoryCard"
import { ResourceCard } from "../components/ResourceCard"
import { LoadingState } from "../components/LoadingState"
import { Disclaimer } from "../components/Disclaimer"

export function HomePage() {
	const [categories, setCategories] = useState<Category[] | null>(null)
	const [resources, setResources] = useState<LegalResource[] | null>(null)

	useEffect(() => {
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
		resourcesApi
			.searchResources({ page: 1, pageSize: 6, sort: "newest" })
			.then((r) => setResources(r.items))
			.catch(() => setResources([]))
	}, [])

	return (
		<div>
			<section className="bg-gradient-to-b from-brand-50 to-white">
				<div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
					<h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
						Understand Your Rights.<br />Find the Right Legal Information.
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
						Access organized legal information, understand legal topics in simpler language, and connect with legal professionals.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<Link to="/library" className="btn-primary">Explore Legal Information</Link>
						<Link to="/professionals" className="btn-secondary">Find a Professional</Link>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-xl font-bold text-slate-800">Popular Categories</h2>
					<Link to="/library" className="text-sm font-medium text-brand-600">View all</Link>
				</div>
				{!categories ? (
					<LoadingState />
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{categories.slice(0, 8).map((c) => (
							<CategoryCard key={c.id} category={c} />
						))}
					</div>
				)}
			</section>

			<section className="bg-slate-50 py-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6">
					<h2 className="mb-6 text-xl font-bold text-slate-800">How It Works</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{[
							{ title: "1. Describe your situation", body: "Search the library or use the Legal Guidance Assistant to describe your issue." },
							{ title: "2. Get organized information", body: "See relevant categories, verified-source resources, and plain-language explanations." },
							{ title: "3. Connect with a professional", body: "Track your issue and reach out to a legal professional when you need real advice." },
						].map((s) => (
							<div key={s.title} className="card">
								<p className="font-semibold text-slate-800">{s.title}</p>
								<p className="mt-1 text-sm text-slate-500">{s.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-xl font-bold text-slate-800">Featured Resources</h2>
					<Link to="/library" className="text-sm font-medium text-brand-600">Browse the library</Link>
				</div>
				{!resources ? (
					<LoadingState />
				) : resources.length === 0 ? (
					<p className="text-sm text-slate-500">No resources found.</p>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{resources.map((r) => (
							<ResourceCard key={r.id} resource={r} />
						))}
					</div>
				)}
			</section>

			<section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
				<Disclaimer />
			</section>
		</div>
	)
}
