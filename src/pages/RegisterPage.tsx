import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { extractErrorMessage } from "../api/client"
import type { Role } from "../types"

export function RegisterPage() {
	const { register } = useAuth()
	const navigate = useNavigate()
	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [role, setRole] = useState<Role>("USER")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function onSubmit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			await register({ fullName, email, password, role })
			navigate("/dashboard")
		} catch (err) {
			setError(extractErrorMessage(err))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
				<p className="mt-1 text-sm text-slate-500">Join Rwanda LegalConnect.</p>
			</div>
			<form onSubmit={onSubmit} className="card flex flex-col gap-4">
				{error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
				<div>
					<label className="label" htmlFor="fullName">Full name</label>
					<input id="fullName" required className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
				</div>
				<div>
					<label className="label" htmlFor="email">Email</label>
					<input id="email" type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label className="label" htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						required
						minLength={8}
						className="input-field"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className="mt-1 text-xs text-slate-400">At least 8 characters, with a letter and a number.</p>
				</div>
				<div>
					<label className="label" htmlFor="role">I am a...</label>
					<select id="role" className="input-field" value={role} onChange={(e) => setRole(e.target.value as Role)}>
						<option value="USER">Citizen / General user</option>
						<option value="LAWYER">Legal professional</option>
					</select>
				</div>
				<button type="submit" disabled={loading} className="btn-primary">{loading ? "Creating account..." : "Create account"}</button>
			</form>
			<p className="text-center text-sm text-slate-500">
				Already have an account? <Link to="/login" className="font-medium text-brand-600">Log in</Link>
			</p>
		</div>
	)
}
