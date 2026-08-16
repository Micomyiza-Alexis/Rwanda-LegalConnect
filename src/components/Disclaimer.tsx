export function Disclaimer({ text }: { text?: string }) {
	return (
		<p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
			\u26a0\ufe0f {text ?? "Rwanda LegalConnect provides general legal information and is not a substitute for advice from a qualified legal professional."}
		</p>
	)
}
