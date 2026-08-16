import { useEffect, useState } from "react"
import * as adminApi from "../../api/admin"
import type { User } from "../../types"
import { LoadingState } from "../../components/LoadingState"
import { StatusBadge } from "../../components/StatusBadge"
import { extractErrorMessage } from "../../api/client"

export function AdminUsersPage() {
	const [users, setUsers] = useState<User[] | null>(null)
	const [q, setQ] = useState("")
	const [error, setError] = useState<string | null>(null)

	function load() {
		adminApi.listUsers({ q: q || undefined }).then(setUsers).catch((e) => setError(extractErrorMessage(e)))
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(load, [])

	async function onStatus(id: string, status: string) {
		try {
			await adminApi.setUserStatus(id, status)
			load()
		} catch (e) {
			setError(extractErrorMessage(e))
		}
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
			<form onSubmit={(e) => { e.preventDefault(); load() }} className="mt-4 flex gap-2">
				<input className="input-field flex-1" placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
				<button type="submit" className="btn-secondary">Search</button>
			</form>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			{!users ? (
				<LoadingState />
			) : (
				<div className="mt-6 overflow-x-auto">
					<table className="w-full min-w-[600px] text-left text-sm">
						<thead className="text-slate-400">
							<tr><th className="py-2">Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{users.map((u) => (
								<tr key={u.id} className="border-t border-slate-100">
									<td className="py-2">{u.profile?.fullName ?? "\u2014"}</td>
									<td>{u.email}</td>
									<td>{u.role}</td>
									<td><StatusBadge status={u.status} /></td>
									<td className="flex gap-2 py-2">
										{u.status !== "SUSPENDED" && <button className="text-xs text-red-600" onClick={() => onStatus(u.id, "SUSPENDED")}>Suspend</button>}
										{u.status !== "ACTIVE" && <button className="text-xs text-green-700" onClick={() => onStatus(u.id, "ACTIVE")}>Activate</button>}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}
