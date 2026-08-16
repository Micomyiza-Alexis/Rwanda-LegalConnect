import { client, unwrap } from "./client"
import type { GuidanceResult } from "../types"

export function getGuidance(description: string) {
	return unwrap<GuidanceResult>(client.post("/guidance", { description }))
}
