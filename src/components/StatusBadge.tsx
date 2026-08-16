const COLORS: Record<string, string> = {
	OPEN: "bg-blue-100 text-blue-800",
	UNDER_REVIEW: "bg-amber-100 text-amber-800",
	IN_PROGRESS: "bg-indigo-100 text-indigo-800",
	RESOLVED: "bg-green-100 text-green-800",
	CLOSED: "bg-slate-200 text-slate-700",
	PENDING: "bg-amber-100 text-amber-800",
	ACCEPTED: "bg-indigo-100 text-indigo-800",
	DECLINED: "bg-red-100 text-red-800",
	VERIFIED: "bg-green-100 text-green-800",
	UNVERIFIED: "bg-slate-200 text-slate-700",
	REJECTED: "bg-red-100 text-red-800",
	LOW: "bg-slate-200 text-slate-700",
	MEDIUM: "bg-blue-100 text-blue-800",
	HIGH: "bg-amber-100 text-amber-800",
	URGENT: "bg-red-100 text-red-800",
	PUBLISHED: "bg-green-100 text-green-800",
	DRAFT: "bg-slate-200 text-slate-700",
	ARCHIVED: "bg-slate-200 text-slate-500",
}

export function StatusBadge({ status }: { status: string }) {
	return <span className={`badge ${COLORS[status] ?? "bg-slate-200 text-slate-700"}`}>{status.replace(/_/g, " ")}</span>
}
