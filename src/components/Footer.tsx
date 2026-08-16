import { Link } from "react-router-dom"

export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				{/* Main footer */}
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div className="lg:col-span-1">
						<Link
							to="/"
							className="group inline-flex items-center gap-2 text-lg font-bold text-white"
						>
							<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
								⚖️
							</span>

							<span>
								Rwanda <span className="text-brand-400">LegalConnect</span>
							</span>
						</Link>

						<p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
							Making legal information easier to find, understand, and
							navigate for everyone in Rwanda.
						</p>

						<div className="mt-5 flex flex-wrap gap-2">
							<span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
								Rwanda-focused
							</span>
							<span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
								Legal information
							</span>
						</div>
					</div>

					{/* Platform */}
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-white">
							Platform
						</h3>

						<ul className="mt-4 space-y-3 text-sm">
							<li>
								<Link
									to="/"
									className="transition-colors hover:text-brand-400"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/library"
									className="transition-colors hover:text-brand-400"
								>
									Legal Library
								</Link>
							</li>
							<li>
								<Link
									to="/guidance"
									className="transition-colors hover:text-brand-400"
								>
									Ask a Question
								</Link>
							</li>
							<li>
								<Link
									to="/professionals"
									className="transition-colors hover:text-brand-400"
								>
									Legal Professionals
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-white">
							Resources
						</h3>

						<ul className="mt-4 space-y-3 text-sm">
							<li>
								<Link
									to="/templates"
									className="transition-colors hover:text-brand-400"
								>
									Document Templates
								</Link>
							</li>
							<li>
								<Link
									to="/issues"
									className="transition-colors hover:text-brand-400"
								>
									My Issues
								</Link>
							</li>
							<li>
								<Link
									to="/saved"
									className="transition-colors hover:text-brand-400"
								>
									Saved Resources
								</Link>
							</li>
							<li>
								<Link
									to="/notifications"
									className="transition-colors hover:text-brand-400"
								>
									Notifications
								</Link>
							</li>
						</ul>
					</div>

					{/* Account */}
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-white">
							Account
						</h3>

						<ul className="mt-4 space-y-3 text-sm">
							<li>
								<Link
									to="/login"
									className="transition-colors hover:text-brand-400"
								>
									Log in
								</Link>
							</li>
							<li>
								<Link
									to="/register"
									className="transition-colors hover:text-brand-400"
								>
									Create an account
								</Link>
							</li>
						</ul>

						<div className="mt-6">
							<p className="text-xs font-medium uppercase tracking-wider text-slate-500">
								Need legal help?
							</p>

							<Link
								to="/professionals"
								className="mt-2 inline-flex items-center text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
							>
								Find a professional
								<span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
									→
								</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Disclaimer */}
				<div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
					<div className="flex gap-3">
						<span className="mt-0.5 shrink-0 text-amber-400">⚠️</span>

						<div>
							<p className="text-sm font-semibold text-slate-200">
								Important legal disclaimer
							</p>

							<p className="mt-1 text-xs leading-5 text-slate-400">
								Rwanda LegalConnect provides general legal information and
								resources for educational and informational purposes. The
								information provided on this platform is not a substitute for
								advice, representation, or services from a qualified legal
								professional.
							</p>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {currentYear} Rwanda LegalConnect. All rights reserved.
					</p>

					<div className="flex gap-5">
						<Link
							to="/privacy"
							className="transition-colors hover:text-slate-300"
						>
							Privacy
						</Link>

						<Link
							to="/terms"
							className="transition-colors hover:text-slate-300"
						>
							Terms
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}