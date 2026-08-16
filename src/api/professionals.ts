import { client, unwrap } from "./client"
import type { LegalProfessional, Paginated } from "../types"

export function searchProfessionals(params: Record<string, string | number | undefined>) {
	return unwrap<Paginated<LegalProfessional>>(client.get("/professionals", { params }))
}

export function getProfessional(id: string) {
	return unwrap<LegalProfessional>(client.get(`/professionals/${id}`))
}

export function getMyProfile() {
	return unwrap<LegalProfessional>(client.get("/professionals/me"))
}

export function updateMyProfile(input: Partial<LegalProfessional>) {
	return unwrap<LegalProfessional>(client.put("/professionals/me", input))
}

export function setAvailability(availability: string) {
	return unwrap<LegalProfessional>(client.patch("/professionals/me/availability", { availability }))
}

export function listAllAdmin() {
	return unwrap<LegalProfessional[]>(client.get("/professionals/admin/all"))
}

export function setVerification(id: string, status: string) {
	return unwrap<LegalProfessional>(client.patch(`/professionals/${id}/verification`, { status }))
}

export function setSuspended(id: string, isSuspended: boolean) {
	return unwrap<LegalProfessional>(client.patch(`/professionals/${id}/suspend`, { isSuspended }))
}
