import { client, unwrap } from "./client"
import type { LegalResource, Paginated } from "../types"

export function searchResources(params: Record<string, string | number | undefined>) {
	return unwrap<Paginated<LegalResource>>(client.get("/resources", { params }))
}

export function getResource(id: string) {
	return unwrap<LegalResource>(client.get(`/resources/${id}`))
}

export function createResource(input: Partial<LegalResource>) {
	return unwrap<LegalResource>(client.post("/resources", input))
}

export function updateResource(id: string, input: Partial<LegalResource>) {
	return unwrap<LegalResource>(client.put(`/resources/${id}`, input))
}

export function deleteResource(id: string) {
	return unwrap<{ message: string }>(client.delete(`/resources/${id}`))
}

export function setResourceStatus(id: string, status: string) {
	return unwrap<LegalResource>(client.patch(`/resources/${id}/status`, { status }))
}
