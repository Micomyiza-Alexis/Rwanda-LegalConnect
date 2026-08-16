import { Link, NavLink, useNavigate } from "react-router-dom"
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

	return (
		<header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
			<nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
				<Link to="/" className="flex items-center gap-2 font-bold text-brand-700">
					<span aria-hidden>\u2696\ufe0f</span>
					Rwanda LegalConnect
				</Link>
				<div className="hidden items-center gap-1 md:flex">
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={({ isActive }) =>
								`rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</div>
				<div className="flex items-center gap-2">
					{user ? (
						<div className="flex items-center gap-2">
							{user.role === "LAWYER" && (
								<Link to="/professional/dashboard" className="btn-secondary hidden sm:inline-flex">
									Professional Dashboard
								</Link>
							)}
							{user.role === "ADMIN" && (
								<Link to="/admin" className="btn-secondary hidden sm:inline-flex">
									Admin
								</Link>
							)}
							<Link to="/notifications" className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
								\ud83d\udd14
							</Link>
							<Link to="/dashboard" className="rounded-full bg-brand-100 px-3 py-1.5 text-sm font-medium text-brand-800">
								{user.profile?.fullName ?? user.email}
							</Link>
							<button
								className="btn-secondary"
								onClick={() => {
									logout()
									navigate("/")
								}}
							>
								Log out
							</button>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<Link to="/login" className="btn-secondary">
								Log in
							</Link>
							<Link to="/register" className="btn-primary">
								Sign up
							</Link>
						</div>
					)}
				</div>
			</nav>
			<div className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-1 md:hidden">
				{navItems.map((item) => (
					<NavLink key={item.to} to={item.to} end={item.end} className="whitespace-nowrap rounded-md px-2 py-1 text-xs text-slate-600">
						{item.label}
					</NavLink>
				))}
			</div>
		</header>
	)
}
