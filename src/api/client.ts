import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api"

export const client = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

client.interceptors.request.use((config) => {
	const token = localStorage.getItem("lc_token")
	if (token) {
		config.headers = config.headers ?? {}
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: { message: string; details?: unknown } }

export function unwrap<T>(promise: Promise<{ data: ApiEnvelope<T> }>): Promise<T> {
	return promise.then((res) => {
		if (res.data.success) return res.data.data
		throw new Error(res.data.error.message)
	})
}

export function extractErrorMessage(err: unknown): string {
	if (axios.isAxiosError(err)) {
		const data = err.response?.data as ApiEnvelope<unknown> | undefined
		if (data && data.success === false) return data.error.message
		if (err.message) return err.message
	}
	if (err instanceof Error) return err.message
	return "Something went wrong. Please try again."
}
