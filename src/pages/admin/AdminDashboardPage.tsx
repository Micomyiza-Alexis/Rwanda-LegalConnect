import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as adminApi from "../../api/admin"
import { LoadingState } from "../../components/LoadingState"

export function AdminDashboardPage() {
	const [stats, setStats] = useState<Awaited<ReturnType<typeof adminApi.getStats>> | null>(null)

	useEffect(() => {
		adminApi.getStats().then(setStats).catch(() => setStats(null))
	}, [])

	const cards = stats
		? [
				{ label: "Users", value: stats.totalUsers, to: "/admin/users" },
				{ label: "Legal Professionals", value: stats.totalProfessionals, to: "/admin/professionals" },
				{ label: "Legal Resources", value: stats.totalResources, to: "/admin/resources" },
				{ label: "Questions Asked", value: stats.totalQuestions, to: "/admin/users" },
				{ label: "Active Issues", value: stats.activeIssues, to: "/admin/users" },
				{ label: "Pending Inquiries", value: stats.pendingRequests, to: "/admin/professionals" },
		  ]
		: []

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
			{!stats ? (
				<LoadingState />
			) : (
				<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
					{cards.map((c) => (
						<Link key={c.label} to={c.to} className="card">
							<p className="text-3xl font-bold text-brand-700">{c.value}</p>
							<p className="mt-1 text-sm text-slate-500">{c.label}</p>
						</Link>
					))}
				</div>
			)}
			<div className="mt-10 flex flex-wrap gap-2">
				<Link to="/admin/categories" className="btn-secondary">Manage Categories</Link>
				<Link to="/admin/resources" className="btn-secondary">Manage Resources</Link>
				<Link to="/admin/articles" className="btn-secondary">Manage Articles</Link>
				<Link to="/admin/templates" className="btn-secondary">Manage Templates</Link>
				<Link to="/admin/professionals" className="btn-secondary">Manage Professionals</Link>
				<Link to="/admin/users" className="btn-secondary">Manage Users</Link>
			</div>
		</div>
	)
}
