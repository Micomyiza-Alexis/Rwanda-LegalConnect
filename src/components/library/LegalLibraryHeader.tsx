import { Search } from "lucide-react"

export function LegalLibraryHeader({
	q,
	onChangeQ,
	onSubmit,
}: {
	q: string
	onChangeQ: (v: string) => void
	onSubmit: (e: React.FormEvent) => void
}) {
	return (
		<div className="border-b border-slate-200 bg-white">
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
				<h1 className="text-3xl font-bold tracking-tight text-slate-900">Legal Library</h1>
				<p className="mt-2 max-w-2xl text-sm text-slate-500">
					Explore Rwanda's laws, regulations, presidential and ministerial orders, and other authoritative
					legal resources.
				</p>

				<form onSubmit={onSubmit} className="mt-6 max-w-2xl">
					<label htmlFor="library-search" className="sr-only">
						Search legal documents
					</label>
					<div className="relative">
						<Search
							className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
							aria-hidden="true"
						/>
						<input
							id="library-search"
							className="input-field pl-10 pr-28 py-3 text-base"
							placeholder="Search laws, regulations, articles, legal notices..."
							value={q}
							onChange={(e) => onChangeQ(e.target.value)}
						/>
						<button
							type="submit"
							className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5"
						>
							Search
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}