import { client, unwrap } from "./client"
import type { LegalIssue } from "../types"

export function createIssue(input: { title: string; description: string; categoryId?: string | null; priority?: string; relatedResourceIds?: string[] }) {
	return unwrap<LegalIssue>(client.post("/issues", input))
}

export function listMyIssues(status?: string) {
	return unwrap<LegalIssue[]>(client.get("/issues/mine", { params: { status } }))
}

export function listAllIssues(status?: string) {
	return unwrap<LegalIssue[]>(client.get("/issues", { params: { status } }))
}

export function getIssue(id: string) {
	return unwrap<LegalIssue>(client.get(`/issues/${id}`))
}

export function updateIssue(id: string, input: Record<string, unknown>) {
	return unwrap<LegalIssue>(client.put(`/issues/${id}`, input))
}

export function closeIssue(id: string) {
	return unwrap<LegalIssue>(client.post(`/issues/${id}/close`))
}

export function addIssueNote(id: string, content: string) {
	return unwrap(client.post(`/issues/${id}/notes`, { content }))
}
