import { useEffect, useState, type FormEvent } from "react"
import { Link, useParams } from "react-router-dom"
import * as issuesApi from "../api/issues"
import type { LegalIssue } from "../types"
import { LoadingState } from "../components/LoadingState"
import { ErrorState } from "../components/ErrorState"
import { StatusBadge } from "../components/StatusBadge"
import { useAuth } from "../context/AuthContext"
import { extractErrorMessage } from "../api/client"

const STATUSES = ["OPEN", "UNDER_REVIEW", "IN_PROGRESS", "RESOLVED", "CLOSED"]

export function IssueDetailPage() {
	const { id } = useParams<{ id: string }>()
	const { user } = useAuth()
	const [issue, setIssue] = useState<LegalIssue | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [note, setNote] = useState("")
	const [savingNote, setSavingNote] = useState(false)

	function load() {
		if (!id) return
		setError(null)
		issuesApi.getIssue(id).then(setIssue).catch((e) => setError(extractErrorMessage(e)))
	}

	useEffect(load, [id])

	async function onAddNote(e: FormEvent) {
		e.preventDefault()
		if (!id || !note.trim()) return
		setSavingNote(true)
		try {
			await issuesApi.addIssueNote(id, note)
			setNote("")
			load()
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setSavingNote(false)
		}
	}

	async function onStatusChange(status: string) {
		if (!id) return
		try {
			await issuesApi.updateIssue(id, { status })
			load()
		} catch (err) {
			setError(extractErrorMessage(err))
		}
	}

	if (error) return <div className="mx-auto max-w-3xl px-4 py-10"><ErrorState message={error} onRetry={load} /></div>
	if (!issue) return <LoadingState />

	const canManage = user?.role === "ADMIN" || user?.role === "LAWYER"

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<Link to="/issues" className="text-sm text-brand-600">&larr; Back to Issues</Link>
			<div className="mt-3 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900">{issue.title}</h1>
				<StatusBadge status={issue.status} />
			</div>
			<p className="mt-2 text-slate-600">{issue.description}</p>
			<div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
				<span>Category: {issue.category?.name ?? "Uncategorized"}</span>
				<span>\u00b7 Priority: {issue.priority}</span>
				<span>\u00b7 Opened {issue.createdAt.slice(0, 10)}</span>
			</div>

			{canManage && (
				<div className="mt-4 flex items-center gap-2">
					<label className="text-sm text-slate-500">Update status:</label>
					<select className="input-field w-auto" value={issue.status} onChange={(e) => onStatusChange(e.target.value)}>
						{STATUSES.map((s) => (
							<option key={s} value={s}>{s.replace(/_/g, " ")}</option>
						))}
					</select>
				</div>
			)}

			{issue.relatedResources.length > 0 && (
				<div className="mt-6">
					<p className="mb-2 text-sm font-semibold text-slate-700">Related resources</p>
					<ul className="list-disc space-y-1 pl-5 text-sm">
						{issue.relatedResources.map((r) => (
							<li key={r.resource.id}>
								<Link to={`/library/${r.resource.id}`} className="text-brand-600">{r.resource.title}</Link>
							</li>
						))}
					</ul>
				</div>
			)}

			<div className="mt-8">
				<p className="mb-2 text-sm font-semibold text-slate-700">Notes / Timeline</p>
				<div className="flex flex-col gap-2">
					{issue.notes.length === 0 && <p className="text-sm text-slate-400">No notes yet.</p>}
					{issue.notes.map((n) => (
						<div key={n.id} className="card py-3 text-sm">
							<p className="text-slate-700">{n.content}</p>
							<p className="mt-1 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString()}</p>
						</div>
					))}
				</div>
				{issue.status !== "CLOSED" && (
					<form onSubmit={onAddNote} className="mt-4 flex gap-2">
						<input className="input-field flex-1" placeholder="Add a note or update..." value={note} onChange={(e) => setNote(e.target.value)} />
						<button type="submit" disabled={savingNote} className="btn-secondary">Add</button>
					</form>
				)}
			</div>

			{issue.status !== "CLOSED" && issue.status !== "RESOLVED" && (
				<div className="mt-6">
					<Link to="/professionals" className="btn-primary">Reach out to a Legal Professional</Link>
				</div>
			)}
		</div>
	)
}
