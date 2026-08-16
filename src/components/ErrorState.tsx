export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
	return (
		<div className="card flex flex-col items-center gap-3 border-red-200 bg-red-50 py-10 text-center">
			<p className="font-medium text-red-700">Something went wrong.</p>
			<p className="text-sm text-red-600">{message}</p>
			{onRetry && (
				<button className="btn-secondary" onClick={onRetry}>
					Try again
				</button>
			)}
		</div>
	)
}
