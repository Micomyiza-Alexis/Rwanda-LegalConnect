import { useEffect, useState } from "react"
import * as savedApi from "../api/savedResources"
import type { SavedResource } from "../types"
import { ResourceCard } from "../components/ResourceCard"
import { LoadingState } from "../components/LoadingState"
import { EmptyState } from "../components/EmptyState"
import { extractErrorMessage } from "../api/client"

export function SavedResourcesPage() {
	const [saved, setSaved] = useState<SavedResource[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		savedApi.listSaved().then(setSaved).catch((e) => setError(extractErrorMessage(e)))
	}, [])

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold text-slate-900">Saved Resources</h1>
			<div className="mt-6">
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!saved ? (
					<LoadingState />
				) : saved.length === 0 ? (
					<EmptyState title="No saved resources." description="Bookmark resources from the Legal Library to see them here." />
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{saved.map((s) => (
							<ResourceCard key={s.id} resource={s.resource} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
