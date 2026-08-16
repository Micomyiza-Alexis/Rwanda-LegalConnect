import { client, unwrap } from "./client"
import type { Category } from "../types"

export function listCategories() {
	return unwrap<Category[]>(client.get("/categories"))
}

export function getCategory(id: string) {
	return unwrap<Category & { resources: unknown[]; articles: unknown[] }>(client.get(`/categories/${id}`))
}

export function createCategory(input: { name: string; description: string; icon?: string; keywords?: string[] }) {
	return unwrap<Category>(client.post("/categories", input))
}

export function updateCategory(id: string, input: Partial<{ name: string; description: string; icon: string; keywords: string[] }>) {
	return unwrap<Category>(client.put(`/categories/${id}`, input))
}

export function deleteCategory(id: string) {
	return unwrap<{ message: string }>(client.delete(`/categories/${id}`))
}
