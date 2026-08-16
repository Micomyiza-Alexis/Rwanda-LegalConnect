import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import * as guidanceApi from "../api/guidance"
import type { GuidanceResult } from "../types"
import { LoadingState } from "../components/LoadingState"
import { Disclaimer } from "../components/Disclaimer"
import { ResourceCard } from "../components/ResourceCard"
import { extractErrorMessage } from "../api/client"
import { useAuth } from "../context/AuthContext"

export function GuidanceAssistantPage() {
	const { user } = useAuth()
	const [description, setDescription] = useState("")
	const [result, setResult] = useState<GuidanceResult | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		setResult(null)
		try {
			const res = await guidanceApi.getGuidance(description)
			setResult(res)
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Legal Guidance Assistant</h1>
			<p className="mt-1 text-sm text-slate-500">
				Describe your situation in plain language. This tool points you to relevant legal categories and resources \u2014 it does not give legal advice.
			</p>
			<div className="mt-4"><Disclaimer /></div>

			<form onSubmit={onSubmit} className="card mt-6 flex flex-col gap-3">
				<textarea
					required
					minLength={10}
					rows={5}
					className="input-field"
					placeholder="Example: My employer has not paid my salary for two months..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				{error && <p className="text-sm text-red-600">{error}</p>}
				<button type="submit" disabled={loading} className="btn-primary self-start">{loading ? "Analyzing..." : "Get Guidance"}</button>
			</form>

			{loading && <LoadingState label="Looking for relevant information..." />}

			{result && (
				<div className="mt-6 flex flex-col gap-4">
					<div className="card">
						<p className="text-sm text-slate-400">Possible legal area</p>
						<p className="text-lg font-semibold text-slate-800">{result.possibleLegalArea ?? "Not clearly identified"}</p>
						<p className="mt-2 text-sm text-slate-600">{result.explanation}</p>
					</div>

					{result.relevantResources.length > 0 && (
						<div>
							<p className="mb-2 text-sm font-semibold text-slate-700">Relevant resources</p>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{result.relevantResources.map((r) => (
									<ResourceCard key={r.id} resource={r} />
								))}
							</div>
						</div>
					)}

					<div className="card">
						<p className="mb-2 text-sm font-semibold text-slate-700">Possible next steps</p>
						<ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
							{result.possibleNextSteps.map((step) => (
								<li key={step}>{step}</li>
							))}
						</ul>
					</div>

					<p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">{result.safetyNote}</p>
					<Disclaimer text={result.disclaimer} />

					{user ? (
						<Link to="/issues/new" className="btn-primary self-start">Track this as a legal issue</Link>
					) : (
						<Link to="/login" className="btn-secondary self-start">Log in to track this issue</Link>
					)}
				</div>
			)}
		</div>
	)
}
