export function LegalLibrarySkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="card animate-pulse space-y-3">
					<div className="h-5 w-24 rounded-full bg-slate-200" />
					<div className="h-4 w-3/4 rounded bg-slate-200" />
					<div className="h-3 w-full rounded bg-slate-100" />
					<div className="h-3 w-5/6 rounded bg-slate-100" />
					<div className="h-8 w-full rounded-lg bg-slate-100" />
				</div>
			))}
		</div>
	)
}