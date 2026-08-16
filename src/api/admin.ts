import { client, unwrap } from "./client"
import type { User } from "../types"

export function getStats() {
	return unwrap<{
		totalUsers: number
		totalProfessionals: number
		totalResources: number
		totalQuestions: number
		activeIssues: number
		pendingRequests: number
	}>(client.get("/admin/stats"))
}

export function listUsers(params?: { q?: string; role?: string; status?: string }) {
	return unwrap<User[]>(client.get("/admin/users", { params }))
}

export function getUser(id: string) {
	return unwrap<User>(client.get(`/admin/users/${id}`))
}

export function setUserStatus(id: string, status: string) {
	return unwrap<User>(client.patch(`/admin/users/${id}/status`, { status }))
}
