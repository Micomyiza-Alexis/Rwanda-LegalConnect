import type { Category } from "../../types"

export function LegalCategoryNav({
	categories,
	activeId,
	onSelect,
}: {
	categories: Category[]
	activeId: string
	onSelect: (id: string) => void
}) {
	if (categories.length === 0) return null

	return (
		<nav aria-label="Legal categories" className="flex flex-wrap gap-2">
			<button
				type="button"
				onClick={() => onSelect("")}
				aria-pressed={activeId === ""}
				className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
					activeId === ""
						? "border-brand-600 bg-brand-600 text-white"
						: "border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
				}`}
			>
				All
			</button>
			{categories.map((c) => (
				<button
					key={c.id}
					type="button"
					onClick={() => onSelect(c.id)}
					aria-pressed={activeId === c.id}
					className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
						activeId === c.id
							? "border-brand-600 bg-brand-600 text-white"
							: "border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
					}`}
				>
					{c.name}
					{typeof c._count?.resources === "number" && (
						<span className={`ml-1.5 ${activeId === c.id ? "text-brand-100" : "text-slate-400"}`}>
							{c._count.resources}
						</span>
					)}
				</button>
			))}
		</nav>
	)
}