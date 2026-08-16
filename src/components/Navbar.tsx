import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const navItems = [
	{ to: "/", label: "Home", end: true },
	{ to: "/library", label: "Legal Library" },
	{ to: "/guidance", label: "Ask a Question" },
	{ to: "/professionals", label: "Professionals" },
	{ to: "/issues", label: "My Issues" },
	{ to: "/saved", label: "Saved Resources" },
]

export function Navbar() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [mobileOpen, setMobileOpen] = useState(false)

	const handleLogout = () => {
		logout()
		navigate("/")
		setMobileOpen(false)
	}

	return (
		<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				
				{/* Brand */}
				<Link
					to="/"
					className="group flex items-center gap-3"
					onClick={() => setMobileOpen(false)}
				>
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-lg shadow-sm transition-transform group-hover:scale-105">
						<span aria-hidden>⚖️</span>
					</div>

					<div className="hidden sm:block">
						<div className="text-[15px] font-bold tracking-tight text-slate-900">
							Rwanda LegalConnect
						</div>
						<div className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
							Legal information & support
						</div>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-1 lg:flex">
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={({ isActive }) =>
								`relative rounded-lg px-3 py-2 text-sm font-medium transition-all ${
									isActive
										? "bg-brand-50 text-brand-700"
										: "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</div>

				{/* Right side */}
				<div className="flex items-center gap-2">
					{user ? (
						<>
							{/* Professional dashboard */}
							{user.role === "LAWYER" && (
								<Link
									to="/professional/dashboard"
									className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 xl:inline-flex"
								>
									Professional Dashboard
								</Link>
							)}

							{/* Admin */}
							{user.role === "ADMIN" && (
								<Link
									to="/admin"
									className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 xl:inline-flex"
								>
									Admin
								</Link>
							)}

							{/* Notifications */}
							<Link
								to="/notifications"
								className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
								aria-label="Notifications"
							>
								<span className="text-lg">🔔</span>

								{/* Notification indicator */}
								<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
							</Link>

							{/* User */}
							<Link
								to="/dashboard"
								className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 transition hover:border-brand-200 hover:bg-brand-50 sm:flex"
							>
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-xs font-bold text-white">
									{(
										user.profile?.fullName ??
										user.email
									)
										.charAt(0)
										.toUpperCase()}
								</div>

								<div className="max-w-[120px]">
									<div className="truncate text-sm font-semibold text-slate-800">
										{user.profile?.fullName ?? "Account"}
									</div>

									<div className="text-[10px] uppercase tracking-wide text-slate-400">
										{user.role === "LAWYER"
											? "Professional"
											: user.role === "ADMIN"
												? "Administrator"
												: "Citizen"}
									</div>
								</div>
							</Link>

							{/* Logout */}
							<button
								className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 md:inline-flex"
								onClick={handleLogout}
							>
								Log out
							</button>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
							>
								Log in
							</Link>

							<Link
								to="/register"
								className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 hover:shadow-md"
							>
								Get Started
							</Link>
						</>
					)}

					{/* Mobile menu button */}
					<button
						type="button"
						className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
						onClick={() => setMobileOpen((open) => !open)}
						aria-label="Toggle navigation menu"
						aria-expanded={mobileOpen}
					>
						<span className="text-xl">
							{mobileOpen ? "✕" : "☰"}
						</span>
					</button>
				</div>
			</nav>

			{/* Mobile Navigation */}
			{mobileOpen && (
				<div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 lg:hidden">
					<div className="mx-auto max-w-7xl space-y-1">
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								end={item.end}
								onClick={() => setMobileOpen(false)}
								className={({ isActive }) =>
									`block rounded-xl px-4 py-3 text-sm font-medium transition ${
										isActive
											? "bg-brand-50 text-brand-700"
											: "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
									}`
								}
							>
								{item.label}
							</NavLink>
						))}

						{user && (
							<>
								<div className="my-3 border-t border-slate-100" />

								<Link
									to="/dashboard"
									onClick={() => setMobileOpen(false)}
									className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
								>
									{user.profile?.fullName ?? user.email}
								</Link>

								<Link
									to="/notifications"
									onClick={() => setMobileOpen(false)}
									className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
								>
									🔔 Notifications
								</Link>

								{user.role === "LAWYER" && (
									<Link
										to="/professional/dashboard"
										onClick={() => setMobileOpen(false)}
										className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
									>
										Professional Dashboard
									</Link>
								)}

								{user.role === "ADMIN" && (
									<Link
										to="/admin"
										onClick={() => setMobileOpen(false)}
										className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
									>
										Admin Dashboard
									</Link>
								)}

								<button
									onClick={handleLogout}
									className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
								>
									Log out
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</header>
	)
}