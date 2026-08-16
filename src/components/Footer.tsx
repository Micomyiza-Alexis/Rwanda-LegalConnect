import { Link } from "react-router-dom"

export function Footer() {
	return (
		<footer className="mt-16 border-t border-slate-200 bg-white">
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
					<div className="col-span-2">
						<p className="font-bold text-brand-700">Rwanda LegalConnect</p>
						<p className="mt-2 max-w-sm text-sm text-slate-500">
							General legal information and access to legal professionals. Not a substitute for professional legal advice.
						</p>
					</div>
					<div>
						<p className="text-sm font-semibold text-slate-700">Explore</p>
						<ul className="mt-2 space-y-1 text-sm text-slate-500">
							<li><Link to="/library">Legal Library</Link></li>
							<li><Link to="/professionals">Professionals</Link></li>
							<li><Link to="/templates">Document Templates</Link></li>
						</ul>
					</div>
					<div>
						<p className="text-sm font-semibold text-slate-700">Account</p>
						<ul className="mt-2 space-y-1 text-sm text-slate-500">
							<li><Link to="/login">Log in</Link></li>
							<li><Link to="/register">Sign up</Link></li>
						</ul>
					</div>
				</div>
				<p className="mt-8 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
					Rwanda LegalConnect provides general legal information and is not a substitute for advice from a qualified legal professional.
				</p>
			</div>
		</footer>
	)
}
