import { Link } from "react-router-dom"
import type { Category } from "../types"

export function CategoryCard({ category }: { category: Category }) {
	return (
		<Link to={`/library?categoryId=${category.id}`} className="card flex flex-col gap-2 hover:border-brand-300 hover:shadow-md">
			<span className="text-2xl">{category.icon}</span>
			<p className="font-semibold text-slate-800">{category.name}</p>
			<p className="line-clamp-2 text-sm text-slate-500">{category.description}</p>
			{category._count && <p className="text-xs text-slate-400">{category._count.resources} resources</p>}
		</Link>
	)
}
