export type Role = "USER" | "LAWYER" | "ADMIN"

export type User = {
	id: string
	email: string
	role: Role
	status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED"
	profile?: { fullName: string; phone?: string; location?: string } | null
	legalProfessional?: LegalProfessional | null
}

export type Category = {
	id: string
	name: string
	slug: string
	description: string
	icon: string
	keywords: string[]
	_count?: { resources: number; articles: number; questions: number }
}

export type DocumentType =
	| "LAW"
	| "REGULATION"
	| "PRESIDENTIAL_ORDER"
	| "MINISTERIAL_ORDER"
	| "LEGAL_ARTICLE"
	| "GUIDELINE"
	| "PUBLIC_LEGAL_RESOURCE"

export type LegalResource = {
	id: string
	title: string
	description: string
	categoryId: string
	category?: Category
	documentType: DocumentType
	source: string
	publicationDate?: string | null
	effectiveDate?: string | null
	referenceNumber?: string | null
	content: string
	sourceUrl?: string | null
	status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
	isDemoData: boolean
	keywords: string[]
	createdAt: string
	updatedAt: string
}

export type LegalArticle = {
	id: string
	title: string
	categoryId: string
	category?: Category
	summary: string
	content: string
	author?: string | null
	status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
	isDemoData: boolean
	createdAt: string
}

export type IssueStatus = "OPEN" | "UNDER_REVIEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
export type IssuePriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export type IssueNote = { id: string; content: string; createdAt: string; authorId: string }

export type LegalIssue = {
	id: string
	userId: string
	title: string
	description: string
	categoryId?: string | null
	category?: Category | null
	priority: IssuePriority
	status: IssueStatus
	assignedProfessionalId?: string | null
	assignedProfessional?: LegalProfessional | null
	notes: IssueNote[]
	relatedResources: Array<{ resource: LegalResource }>
	createdAt: string
	updatedAt: string
}

export type VerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED"

export type LegalProfessional = {
	id: string
	userId: string
	fullName: string
	professionalTitle: string
	profilePhotoUrl?: string | null
	specializations: string[]
	location: string
	yearsOfExperience: number
	bio: string
	languages: string[]
	contactMethod: string
	availability: string
	verificationStatus: VerificationStatus
	isSuspended: boolean
	profileCompletion: number
}

export type InquiryStatus = "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "RESOLVED" | "DECLINED"

export type ProfessionalInquiry = {
	id: string
	userId: string
	user?: User
	professionalId: string
	professional?: LegalProfessional
	subject: string
	description: string
	categoryId?: string | null
	status: InquiryStatus
	response?: string | null
	createdAt: string
	updatedAt: string
}

export type DocumentTemplate = {
	id: string
	title: string
	description: string
	categoryId: string
	category?: Category
	content: string
	disclaimer: string
}

export type SavedResource = {
	id: string
	resourceId: string
	resource: LegalResource
	createdAt: string
}

export type AppNotification = {
	id: string
	type: string
	title: string
	message: string
	isRead: boolean
	link?: string | null
	createdAt: string
}

export type Paginated<T> = {
	items: T[]
	pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export type GuidanceResult = {
	possibleLegalArea: string | null
	confidence: "none" | "low" | "medium"
	explanation: string
	relevantResources: LegalResource[]
	possibleNextSteps: string[]
	disclaimer: string
	safetyNote: string
}
