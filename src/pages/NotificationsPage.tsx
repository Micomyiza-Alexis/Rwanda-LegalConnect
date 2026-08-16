import { useEffect, useState } from "react"
import * as notificationsApi from "../api/notifications"
import type { AppNotification } from "../types"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"

export function NotificationsPage() {
	const [items, setItems] = useState<AppNotification[] | null>(null)

	function load() {
		notificationsApi.listNotifications().then(setItems).catch(() => setItems([]))
	}
	useEffect(load, [])

	async function onMarkAll() {
		await notificationsApi.markAllRead()
		load()
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
				<button className="btn-secondary" onClick={onMarkAll}>Mark all as read</button>
			</div>
			<div className="mt-6">
				{!items ? (
					<LoadingState />
				) : items.length === 0 ? (
					<EmptyState title="No notifications yet." />
				) : (
					<div className="flex flex-col gap-2">
						{items.map((n) => (
							<div
								key={n.id}
								className="card py-3"
								onClick={() => notificationsApi.markRead(n.id).then(load)}
								style={{ opacity: n.isRead ? 0.6 : 1, cursor: "pointer" }}
							>
								<p className="font-medium text-slate-700">{n.title}</p>
								<p className="text-sm text-slate-500">{n.message}</p>
								<p className="mt-1 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
