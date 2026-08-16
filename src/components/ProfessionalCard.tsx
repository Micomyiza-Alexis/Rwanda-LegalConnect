import { Link } from "react-router-dom"
import type { LegalProfessional } from "../types"
import { StatusBadge } from "./StatusBadge"

export function ProfessionalCard({ professional }: { professional: LegalProfessional }) {
	return (
		<Link to={`/professionals/${professional.id}`} className="card flex flex-col gap-2 hover:border-brand-300 hover:shadow-md">
			<div className="flex items-center justify-between">
				<p className="font-semibold text-slate-800">{professional.fullName}</p>
				<StatusBadge status={professional.verificationStatus} />
			</div>
			<p className="text-sm text-slate-500">{professional.professionalTitle} \u00b7 {professional.location}</p>
			<div className="flex flex-wrap gap-1">
				{professional.specializations.slice(0, 3).map((s) => (
					<span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>
				))}
			</div>
			<p className="text-xs text-slate-400">{professional.yearsOfExperience} years experience \u00b7 {professional.availability}</p>
		</Link>
	)
}
