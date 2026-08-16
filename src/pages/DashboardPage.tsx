import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import * as issuesApi from "../api/issues"
import * as savedApi from "../api/savedResources"
import * as categoriesApi from "../api/categories"
import type { LegalIssue, SavedResource, Category } from "../types"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { ErrorState } from "../components/ErrorState"
import { StatusBadge } from "../components/StatusBadge"
import { extractErrorMessage } from "../api/client"

export function DashboardPage() {
	const { user } = useAuth()
	const [issues, setIssues] = useState<LegalIssue[] | null>(null)
	const [saved, setSaved] = useState<SavedResource[] | null>(null)
	const [categories, setCategories] = useState<Category[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	function load() {
		setError(null)
		issuesApi.listMyIssues().then(setIssues).catch((e) => setError(extractErrorMessage(e)))
		savedApi.listSaved().then(setSaved).catch(() => setSaved([]))
		categoriesApi.listCategories().then(setCategories).catch(() => setCategories([]))
	}

	useEffect(load, [])

	if (error) return <div className="mx-auto max-w-5xl px-4 py-10"><ErrorState message={error} onRetry={load} /></div>

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Hello, {user?.profile?.fullName ?? user?.email} \ud83d\udc4b</h1>
			<div className="mt-4">
				<Link to="/library" className="input-field flex items-center text-slate-400">Search legal information...</Link>
			</div>

			<div className="mt-8">
				<h2 className="mb-3 text-lg font-semibold text-slate-800">Popular Categories</h2>
				{!categories ? (
					<LoadingState />
				) : (
					<div className="flex flex-wrap gap-2">
						{categories.slice(0, 8).map((c) => (
							<Link key={c.id} to={`/library?categoryId=${c.id}`} className="badge bg-brand-50 text-brand-700">{c.icon} {c.name}</Link>
						))}
					</div>
				)}
			</div>

			<div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div>
					<div className="mb-3 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-slate-800">My Legal Issues</h2>
						<Link to="/issues/new" className="text-sm font-medium text-brand-600">+ New issue</Link>
					</div>
					{!issues ? (
						<LoadingState />
					) : issues.length === 0 ? (
						<EmptyState title="No legal issues yet." description="Create one to start tracking a legal matter." />
					) : (
						<div className="flex flex-col gap-2">
							{issues.slice(0, 5).map((issue) => (
								<Link key={issue.id} to={`/issues/${issue.id}`} className="card flex items-center justify-between py-3">
									<span className="font-medium text-slate-700">{issue.title}</span>
									<StatusBadge status={issue.status} />
								</Link>
							))}
						</div>
					)}
				</div>

				<div>
					<div className="mb-3 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-slate-800">Saved Resources</h2>
						<Link to="/saved" className="text-sm font-medium text-brand-600">View all</Link>
					</div>
					{!saved ? (
						<LoadingState />
					) : saved.length === 0 ? (
						<EmptyState title="No saved resources yet." description="Bookmark resources from the Legal Library." />
					) : (
						<div className="flex flex-col gap-2">
							{saved.slice(0, 5).map((s) => (
								<Link key={s.id} to={`/library/${s.resource.id}`} className="card py-3 font-medium text-slate-700">{s.resource.title}</Link>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="mt-10 card flex items-center justify-between">
				<div>
					<p className="font-semibold text-slate-800">Need professional help?</p>
					<p className="text-sm text-slate-500">Browse verified legal professionals by specialization and location.</p>
				</div>
				<Link to="/professionals" className="btn-primary">Find a Legal Professional</Link>
			</div>
		</div>
	)
}
