import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import * as authApi from "../api/auth"
import type { Role, User } from "../types"

type AuthContextValue = {
	user: User | null
	loading: boolean
	login: (email: string, password: string) => Promise<User>
	register: (input: { email: string; password: string; fullName: string; phone?: string; role?: Role }) => Promise<User>
	logout: () => void
	refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	async function refresh() {
		const token = localStorage.getItem("lc_token")
		if (!token) {
			setUser(null)
			setLoading(false)
			return
		}
		try {
			const current = await authApi.me()
			setUser(current)
		} catch {
			localStorage.removeItem("lc_token")
			setUser(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		refresh()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function login(email: string, password: string) {
		const result = await authApi.login({ email, password })
		localStorage.setItem("lc_token", result.token)
		setUser(result.user)
		return result.user
	}

	async function register(input: { email: string; password: string; fullName: string; phone?: string; role?: Role }) {
		const result = await authApi.register(input)
		localStorage.setItem("lc_token", result.token)
		setUser(result.user)
		return result.user
	}

	function logout() {
		localStorage.removeItem("lc_token")
		setUser(null)
	}

	return <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth must be used within AuthProvider")
	return ctx
}
