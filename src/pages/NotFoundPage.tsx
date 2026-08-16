import { Link } from "react-router-dom"

export function NotFoundPage() {
	return (
		<div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
			<p className="text-5xl">\ud83d\udcc4</p>
			<h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
			<p className="text-slate-500">The page you're looking for doesn't exist.</p>
			<Link to="/" className="btn-primary">Go home</Link>
		</div>
	)
}
