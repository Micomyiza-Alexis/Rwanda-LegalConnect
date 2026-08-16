export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
	return (
		<div className="card flex flex-col items-center justify-center gap-2 py-12 text-center">
			<p className="text-base font-semibold text-slate-700">{title}</p>
			{description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
			{action}
		</div>
	)
}
