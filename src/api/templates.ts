import { client, unwrap } from "./client"
import type { DocumentTemplate } from "../types"

export function listTemplates(categoryId?: string) {
	return unwrap<DocumentTemplate[]>(client.get("/templates", { params: { categoryId } }))
}

export function getTemplate(id: string) {
	return unwrap<DocumentTemplate>(client.get(`/templates/${id}`))
}

export function createTemplate(input: Partial<DocumentTemplate>) {
	return unwrap<DocumentTemplate>(client.post("/templates", input))
}

export function updateTemplate(id: string, input: Partial<DocumentTemplate>) {
	return unwrap<DocumentTemplate>(client.put(`/templates/${id}`, input))
}

export function deleteTemplate(id: string) {
	return unwrap<{ message: string }>(client.delete(`/templates/${id}`))
}
