import { client, unwrap } from "./client"
import type { AppNotification } from "../types"

export function listNotifications() {
	return unwrap<AppNotification[]>(client.get("/notifications"))
}

export function markRead(id: string) {
	return unwrap(client.patch(`/notifications/${id}/read`))
}

export function markAllRead() {
	return unwrap(client.post("/notifications/read-all"))
}
