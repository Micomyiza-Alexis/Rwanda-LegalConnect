import { client, unwrap } from "./client"
import type { ProfessionalInquiry } from "../types"

export function createInquiry(input: { professionalId: string; subject: string; description: string; categoryId?: string | null }) {
	return unwrap<ProfessionalInquiry>(client.post("/inquiries", input))
}

export function listMyInquiries() {
	return unwrap<ProfessionalInquiry[]>(client.get("/inquiries/mine"))
}

export function listForProfessional(status?: string) {
	return unwrap<ProfessionalInquiry[]>(client.get("/inquiries/professional", { params: { status } }))
}

export function getInquiry(id: string) {
	return unwrap<ProfessionalInquiry>(client.get(`/inquiries/${id}`))
}

export function respond(id: string, input: { status?: string; response?: string }) {
	return unwrap<ProfessionalInquiry>(client.put(`/inquiries/${id}/respond`, input))
}
