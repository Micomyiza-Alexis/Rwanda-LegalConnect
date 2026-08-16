import { useState, type FormEvent } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { extractErrorMessage } from "../api/client"

export function LoginPage() {
	const { login } = useAuth()
	const navigate = useNavigate()
	const location = useLocation() as { state?: { from?: string } }
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			await login(email, password)
			navigate(location.state?.from ?? "/dashboard")
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-slate-900">Log in</h1>
				<p className="mt-1 text-sm text-slate-500">Welcome back to Rwanda LegalConnect.</p>
			</div>
			<form onSubmit={onSubmit} className="card flex flex-col gap-4">
				{error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
				<div>
					<label className="label" htmlFor="email">Email</label>
					<input id="email" type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label className="label" htmlFor="password">Password</label>
					<input id="password" type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit" disabled={loading} className="btn-primary">{loading ? "Logging in..." : "Log in"}</button>
			</form>
			<p className="text-center text-sm text-slate-500">
				Don't have an account? <Link to="/register" className="font-medium text-brand-600">Sign up</Link>
			</p>
			<div className="card bg-slate-50 text-xs text-slate-500">
				<p className="font-semibold">Demo accounts (seeded)</p>
				<p>Citizen: citizen@example.com / Password123</p>
				<p>Lawyer: j.uwimana@legalconnect.rw / Password123</p>
				<p>Admin: admin@legalconnect.rw / Password123</p>
			</div>
		</div>
	)
}
