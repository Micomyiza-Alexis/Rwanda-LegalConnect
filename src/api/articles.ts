import { client, unwrap } from "./client"
import type { LegalArticle } from "../types"

export function listArticles(params?: { categoryId?: string }) {
	return unwrap<LegalArticle[]>(client.get("/articles", { params }))
}

export function getArticle(id: string) {
	return unwrap<LegalArticle>(client.get(`/articles/${id}`))
}

export function createArticle(input: Partial<LegalArticle>) {
	return unwrap<LegalArticle>(client.post("/articles", input))
}

export function updateArticle(id: string, input: Partial<LegalArticle>) {
	return unwrap<LegalArticle>(client.put(`/articles/${id}`, input))
}

export function deleteArticle(id: string) {
	return unwrap<{ message: string }>(client.delete(`/articles/${id}`))
}
