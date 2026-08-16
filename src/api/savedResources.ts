import { client, unwrap } from "./client"
import type { SavedResource } from "../types"

export function listSaved() {
	return unwrap<SavedResource[]>(client.get("/saved-resources"))
}

export function saveResource(resourceId: string) {
	return unwrap(client.post("/saved-resources", { resourceId }))
}

export function removeSaved(resourceId: string) {
	return unwrap<{ message: string }>(client.delete(`/saved-resources/${resourceId}`))
}
