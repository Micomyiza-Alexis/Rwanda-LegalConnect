import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as categoriesApi from "../api/categories"
import * as resourcesApi from "../api/resources"
import type { Category, LegalResource } from "../types"
import { CategoryCard } from "../components/CategoryCard"
import { ResourceCard } from "../components/ResourceCard"
import { LoadingState } from "../components/LoadingState"
import { Disclaimer } from "../components/Disclaimer"

const quickActions = [
	{
		icon: "📚",
		title: "Explore the Legal Library",
		description: "Find organized legal information and resources.",
		to: "/library",
	},
	{
		icon: "❓",
		title: "Ask a Question",
		description: "Describe your situation in your own words.",
		to: "/guidance",
	},
	{
		icon: "⚖️",
		title: "Find a Professional",
		description: "Connect with a legal professional when you need help.",
		to: "/professionals",
	},
	{
		icon: "📝",
		title: "Track an Issue",
		description: "Keep your legal matters organized in one place.",
		to: "/issues",
	},
]

const steps = [
	{
		number: "01",
		icon: "🔎",
		title: "Discover",
		body: "Search legal topics, browse categories, or describe your situation.",
	},
	{
		number: "02",
		icon: "💡",
		title: "Understand",
		body: "Explore structured information and plain-language explanations.",
	},
	{
		number: "03",
		icon: "🤝",
		title: "Get help",
		body: "Connect with a legal professional when information alone isn't enough.",
	},
]

const trustPoints = [
	{
		icon: "📚",
		title: "Organized information",
		body: "Legal topics are grouped into categories so you can find what matters faster.",
	},
	{
		icon: "🔎",
		title: "Clear sources",
		body: "Resources can reference their legal source, publication details, and supporting information.",
	},
	{
		icon: "🔐",
		title: "Your account, your activity",
		body: "Save resources, track issues, and manage your interactions from one place.",
	},
]

export function HomePage() {
	const [categories, setCategories] = useState<Category[] | null>(null)
	const [resources, setResources] = useState<LegalResource[] | null>(null)

	useEffect(() => {
		categoriesApi
			.listCategories()
			.then(setCategories)
			.catch(() => setCategories([]))

		resourcesApi
			.searchResources({
				page: 1,
				pageSize: 6,
				sort: "newest",
			})
			.then((r) => setResources(r.items))
			.catch(() => setResources([]))
	}, [])

	return (
		<div className="overflow-hidden bg-white">

			{/* =========================================================
			    HERO
			========================================================= */}
			<section className="relative isolate overflow-hidden bg-[#0F2747]">
				{/* Decorative background */}
				<div
					aria-hidden
					className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1E5AA8]/30 blur-3xl"
				/>

				<div
					aria-hidden
					className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-3xl"
				/>

				<div
					aria-hidden
					className="absolute inset-0 opacity-[0.05]"
					style={{
						backgroundImage:
							"linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>

				<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28">

					{/* Hero copy */}
					<div className="max-w-3xl">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur transition hover:bg-white/15">
							<span className="h-2 w-2 animate-pulse rounded-full bg-[#C9A227]" />
							Legal information made easier to understand
						</div>

						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
							Understand your rights.
							<span className="mt-2 block text-[#D8B94C]">
								Know your next step.
							</span>
						</h1>

						<p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
							Rwanda LegalConnect helps you discover legal information,
							understand common legal topics, organize your legal issues,
							and connect with legal professionals when you need further help.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								to="/library"
								className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0F2747] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl"
							>
								Explore Legal Library
								<span className="transition-transform duration-300 group-hover:translate-x-1">
									→
								</span>
							</Link>

							<Link
								to="/guidance"
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
							>
								Ask a Question
							</Link>
						</div>

						<div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100/80">
							<span className="flex items-center gap-2">
								<span className="text-[#D8B94C]">✓</span>
								Organized legal resources
							</span>

							<span className="flex items-center gap-2">
								<span className="text-[#D8B94C]">✓</span>
								Professional directory
							</span>

							<span className="flex items-center gap-2">
								<span className="text-[#D8B94C]">✓</span>
								Personal issue tracking
							</span>
						</div>
					</div>

					{/* Hero visual placeholder */}
					<div className="relative hidden min-h-[430px] lg:block">
						<div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm" />

						<div className="absolute left-10 top-14 w-72 rotate-[-3deg] rounded-2xl border border-white/10 bg-white p-6 shadow-2xl transition duration-500 hover:rotate-0 hover:scale-[1.02]">
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F2747] text-xl">
									⚖️
								</div>

								<div>
									<p className="text-xs font-medium text-slate-400">
										Rwanda LegalConnect
									</p>
									<p className="font-bold text-slate-900">
										Legal Library
									</p>
								</div>
							</div>

							<div className="mt-6 h-2 w-3/4 rounded-full bg-slate-100" />
							<div className="mt-2 h-2 w-full rounded-full bg-slate-100" />
							<div className="mt-2 h-2 w-5/6 rounded-full bg-slate-100" />

							<div className="mt-6 rounded-xl bg-slate-50 p-4">
								<p className="text-xs font-semibold text-[#0F2747]">
									Popular topic
								</p>
								<p className="mt-1 text-sm text-slate-600">
									Employment & labour rights
								</p>
							</div>
						</div>

						<div className="absolute bottom-12 right-8 w-64 rotate-[4deg] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl transition duration-500 hover:rotate-0 hover:scale-[1.02]">
							<div className="flex items-center justify-between">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
									🤝
								</div>

								<span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
									Available
								</span>
							</div>

							<p className="mt-4 font-bold text-slate-900">
								Need professional help?
							</p>

							<p className="mt-1 text-sm leading-6 text-slate-500">
								Find a professional based on your legal needs.
							</p>

							<div className="mt-4 h-10 rounded-lg bg-[#0F2747] text-center text-sm font-semibold leading-10 text-white">
								Find a Professional
							</div>
						</div>

						{/* Gold floating accent */}
						<div className="absolute right-20 top-4 flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl bg-[#C9A227] text-2xl shadow-lg [animation-duration:3s]">
							⚖️
						</div>
					</div>
				</div>
			</section>

			{/* =========================================================
			    QUICK ACTIONS
			========================================================= */}
			<section className="relative z-10 -mt-8 px-4 sm:px-6">
				<div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{quickActions.map((action) => (
						<Link
							key={action.title}
							to={action.to}
							className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-[#C9A227]/50 hover:shadow-xl"
						>
							<div className="flex items-start gap-4">
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl transition duration-300 group-hover:bg-[#0F2747] group-hover:scale-105">
									{action.icon}
								</div>

								<div>
									<h2 className="font-bold text-slate-900">
										{action.title}
									</h2>

									<p className="mt-1 text-sm leading-5 text-slate-500">
										{action.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* =========================================================
			    INTRO
			========================================================= */}
			<section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C9A227]">
					LegalConnect
				</p>

				<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F2747] sm:text-4xl">
					Legal information shouldn't feel complicated.
				</h2>

				<p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
					Whether you're looking for information about employment,
					family, property, business, or another legal topic, Rwanda
					LegalConnect gives you a structured place to start.
				</p>
			</section>

			{/* =========================================================
			    CATEGORIES
			========================================================= */}
			<section className="bg-slate-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8 flex items-end justify-between gap-4">
						<div>
							<p className="text-sm font-bold uppercase tracking-wider text-[#C9A227]">
								Explore
							</p>

							<h2 className="mt-1 text-2xl font-bold text-[#0F2747] sm:text-3xl">
								Popular legal topics
							</h2>

							<p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
								Start with a topic that matches your situation.
							</p>
						</div>

						<Link
							to="/library"
							className="hidden text-sm font-bold text-[#1E5AA8] transition hover:text-[#0F2747] sm:block"
						>
							View all topics →
						</Link>
					</div>

					{!categories ? (
						<LoadingState />
					) : categories.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
							<p className="text-sm text-slate-500">
								No legal categories are available yet.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{categories.slice(0, 8).map((category) => (
								<div
									key={category.id}
									className="transition duration-300 hover:-translate-y-1"
								>
									<CategoryCard category={category} />
								</div>
							))}
						</div>
					)}

					<Link
						to="/library"
						className="mt-6 block text-center text-sm font-bold text-[#1E5AA8] sm:hidden"
					>
						View all legal topics →
					</Link>
				</div>
			</section>

			{/* =========================================================
			    HOW IT WORKS
			========================================================= */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<p className="text-sm font-bold uppercase tracking-wider text-[#C9A227]">
							Simple by design
						</p>

						<h2 className="mt-2 text-3xl font-bold text-[#0F2747]">
							From a question to a clearer next step
						</h2>

						<p className="mt-4 text-slate-500">
							LegalConnect brings information, organization, and
							professional connections together in one place.
						</p>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-3">
						{steps.map((step, index) => (
							<div
								key={step.number}
								className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-xl"
							>
								<div className="flex items-center justify-between">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747] text-xl transition duration-300 group-hover:scale-110">
										{step.icon}
									</div>

									<span className="text-4xl font-black text-slate-100">
										{step.number}
									</span>
								</div>

								<h3 className="mt-6 text-lg font-bold text-slate-900">
									{step.title}
								</h3>

								<p className="mt-2 text-sm leading-6 text-slate-500">
									{step.body}
								</p>

								{index < steps.length - 1 && (
									<div
										aria-hidden
										className="absolute -right-5 top-1/2 z-10 hidden text-xl text-[#C9A227] md:block"
									>
										→
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* =========================================================
			    FEATURED RESOURCES
			========================================================= */}
			<section className="bg-slate-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8 flex items-end justify-between gap-4">
						<div>
							<p className="text-sm font-bold uppercase tracking-wider text-[#C9A227]">
								Legal Library
							</p>

							<h2 className="mt-1 text-2xl font-bold text-[#0F2747] sm:text-3xl">
								Explore recent resources
							</h2>
						</div>

						<Link
							to="/library"
							className="hidden text-sm font-bold text-[#1E5AA8] transition hover:text-[#0F2747] sm:block"
						>
							Browse library →
						</Link>
					</div>

					{!resources ? (
						<LoadingState />
					) : resources.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
							<div className="text-3xl">📚</div>
							<p className="mt-3 font-semibold text-slate-800">
								Your legal library is getting ready.
							</p>
							<p className="mt-1 text-sm text-slate-500">
								Check back soon for new resources.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{resources.map((resource) => (
								<div
									key={resource.id}
									className="transition duration-300 hover:-translate-y-1"
								>
									<ResourceCard resource={resource} />
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			{/* =========================================================
			    TRUST
			========================================================= */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
						<div>
							<p className="text-sm font-bold uppercase tracking-wider text-[#C9A227]">
								Built for clarity
							</p>

							<h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F2747] sm:text-4xl">
								A clearer place to start when legal questions arise.
							</h2>

							<p className="mt-5 text-base leading-8 text-slate-600">
								LegalConnect is designed to help people find and
								organize information before deciding what they need
								to do next.
							</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-3">
							{trustPoints.map((point) => (
								<div
									key={point.title}
									className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
								>
									<div className="text-2xl">{point.icon}</div>

									<h3 className="mt-4 font-bold text-slate-900">
										{point.title}
									</h3>

									<p className="mt-2 text-sm leading-6 text-slate-500">
										{point.body}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* =========================================================
			    PROFESSIONAL CTA
			========================================================= */}
			<section className="px-4 pb-20 sm:px-6">
				<div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0F2747]">
					<div className="relative px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
						<div
							aria-hidden
							className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#1E5AA8]/30 to-transparent"
						/>

						<div className="relative max-w-2xl">
							<div className="mb-4 text-3xl">⚖️</div>

							<h2 className="text-3xl font-bold text-white sm:text-4xl">
								Sometimes information isn't enough.
							</h2>

							<p className="mt-4 max-w-xl leading-7 text-blue-100">
								When you need help with a specific legal situation,
								explore the professional directory and find someone
								who may be able to assist you.
							</p>

							<Link
								to="/professionals"
								className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#C9A227] px-6 py-3.5 text-sm font-bold text-[#0F2747] transition duration-300 hover:-translate-y-0.5 hover:bg-[#D8B94C] hover:shadow-lg"
							>
								Find a Legal Professional
								<span>→</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* =========================================================
			    DISCLAIMER
			========================================================= */}
			<section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
				<Disclaimer />
			</section>
		</div>
	)
}