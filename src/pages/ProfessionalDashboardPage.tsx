import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import * as professionalsApi from "../api/professionals"
import * as inquiriesApi from "../api/inquiries"
import type { LegalProfessional, ProfessionalInquiry } from "../types"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { StatusBadge } from "../components/StatusBadge"
import { extractErrorMessage } from "../api/client"

export function ProfessionalDashboardPage() {
	const [profile, setProfile] = useState<LegalProfessional | null>(null)
	const [inquiries, setInquiries] = useState<ProfessionalInquiry[] | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [saving, setSaving] = useState(false)

	function load() {
		professionalsApi.getMyProfile().then(setProfile).catch((e) => setError(extractErrorMessage(e)))
		inquiriesApi.listForProfessional().then(setInquiries).catch(() => setInquiries([]))
	}
	useEffect(load, [])

	async function onSaveField<K extends keyof LegalProfessional>(key: K, value: LegalProfessional[K]) {
		if (!profile) return
		setSaving(true)
		try {
			const updated = await professionalsApi.updateMyProfile({ [key]: value } as Partial<LegalProfessional>)
			setProfile(updated)
		} catch (e) {
			setError(extractErrorMessage(e))
		} finally {
			setSaving(false)
		}
	}

	async function onProfileSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!profile) return
		const form = new FormData(e.currentTarget)
		setSaving(true)
		try {
			const updated = await professionalsApi.updateMyProfile({
				professionalTitle: String(form.get("professionalTitle") ?? ""),
				location: String(form.get("location") ?? ""),
				yearsOfExperience: Number(form.get("yearsOfExperience") ?? 0),
				bio: String(form.get("bio") ?? ""),
				specializations: String(form.get("specializations") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
				languages: String(form.get("languages") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
			})
			setProfile(updated)
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setSaving(false)
		}
	}

	if (error && !profile) return <p className="mx-auto max-w-3xl px-4 py-10 text-red-600">{error}</p>
	if (!profile) return <LoadingState />

	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900">Professional Dashboard</h1>
				<StatusBadge status={profile.verificationStatus} />
			</div>
			<p className="mt-1 text-sm text-slate-500">Profile completion: {profile.profileCompletion}%</p>

			<form onSubmit={onProfileSubmit} className="card mt-6 flex flex-col gap-3">
				<p className="font-semibold text-slate-800">My Profile</p>
				<div className="grid grid-cols-2 gap-3">
					<div><label className="label">Title</label><input name="professionalTitle" defaultValue={profile.professionalTitle} className="input-field" /></div>
					<div><label className="label">Location</label><input name="location" defaultValue={profile.location} className="input-field" /></div>
					<div><label className="label">Years of experience</label><input name="yearsOfExperience" type="number" min={0} defaultValue={profile.yearsOfExperience} className="input-field" /></div>
					<div><label className="label">Languages (comma separated)</label><input name="languages" defaultValue={profile.languages.join(", ")} className="input-field" /></div>
				</div>
				<div><label className="label">Specializations (comma separated)</label><input name="specializations" defaultValue={profile.specializations.join(", ")} className="input-field" /></div>
				<div><label className="label">Bio</label><textarea name="bio" rows={4} defaultValue={profile.bio} className="input-field" /></div>
				<div className="flex items-center gap-3">
					<button type="submit" disabled={saving} className="btn-primary self-start">{saving ? "Saving..." : "Save Profile"}</button>
					<select className="input-field w-auto" value={profile.availability} onChange={(e) => onSaveField("availability", e.target.value)}>
						<option value="AVAILABLE">Available</option>
						<option value="BUSY">Busy</option>
						<option value="UNAVAILABLE">Unavailable</option>
					</select>
				</div>
			</form>

			<div className="mt-8">
				<p className="mb-3 text-lg font-semibold text-slate-800">Incoming Inquiries</p>
				{!inquiries ? (
					<LoadingState />
				) : inquiries.length === 0 ? (
					<EmptyState title="No inquiries yet." description="Citizens who contact you will show up here." />
				) : (
					<div className="flex flex-col gap-2">
						{inquiries.map((inq) => (
							<Link key={inq.id} to={`/inquiries/${inq.id}`} className="card flex items-center justify-between py-3">
								<span className="font-medium text-slate-700">{inq.subject}</span>
								<StatusBadge status={inq.status} />
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
