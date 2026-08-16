import { client, unwrap } from "./client"

export function askQuestion(input: { question: string; categoryId?: string }) {
	return unwrap(client.post("/questions", input))
}

export function listMyQuestions() {
	return unwrap(client.get("/questions/mine"))
}
