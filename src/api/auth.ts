import { client, unwrap } from "./client"
import type { User, Role } from "../types"

export function register(input: { email: string; password: string; fullName: string; phone?: string; role?: Role }) {
	return unwrap<{ token: string; user: User }>(client.post("/auth/register", input))
}

export function login(input: { email: string; password: string }) {
	return unwrap<{ token: string; user: User }>(client.post("/auth/login", input))
}

export function me() {
	return unwrap<User>(client.get("/auth/me"))
}
