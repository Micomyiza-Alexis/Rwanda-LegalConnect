const DOCUMENT_TYPES = [
	"LAW",
	"REGULATION",
	"PRESIDENTIAL_ORDER",
	"MINISTERIAL_ORDER",
	"LEGAL_ARTICLE",
	"GUIDELINE",
	"PUBLIC_LEGAL_RESOURCE",
]

export function LegalFilters({
	documentType,
	year,
	source,
	onChangeDocumentType,
	onChangeYear,
	onChangeSource,
	onClear,
}: {
	documentType: string
	year: string
	source: string
	onChangeDocumentType: (v: string) => void
	onChangeYear: (v: string) => void
	onChangeSource: (v: string) => void
	onClear: () => void
}) {
	const hasActiveFilters = documentType || year || source

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-semibold text-slate-900">Filters</h2>
				{hasActiveFilters && (
					<button type="button" onClick={onClear} className="text-xs font-medium text-brand-600 hover:text-brand-700">
						Clear all
					</button>
				)}
			</div>

			<div>
				<label className="label" htmlFor="filter-doctype">
					Document type
				</label>
				<select
					id="filter-doctype"
					className="input-field"
					value={documentType}
					onChange={(e) => onChangeDocumentType(e.target.value)}
				>
					<option value="">All document types</option>
					{DOCUMENT_TYPES.map((t) => (
						<option key={t} value={t}>
							{t.replace(/_/g, " ")}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="label" htmlFor="filter-year">
					Year
				</label>
				<input
					id="filter-year"
					type="number"
					inputMode="numeric"
					placeholder="e.g. 2018"
					className="input-field"
					value={year}
					onChange={(e) => onChangeYear(e.target.value)}
				/>
			</div>

			<div>
				<label className="label" htmlFor="filter-source">
					Institution / source
				</label>
				<input
					id="filter-source"
					type="text"
					placeholder="e.g. Parliament of Rwanda"
					className="input-field"
					value={source}
					onChange={(e) => onChangeSource(e.target.value)}
				/>
			</div>
		</div>
	)
}