import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { ProtectedRoute } from "./components/ProtectedRoute"

import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { DashboardPage } from "./pages/DashboardPage"
import { LibraryPage } from "./pages/LibraryPage"
import { ResourceDetailPage } from "./pages/ResourceDetailPage"
import { GuidanceAssistantPage } from "./pages/GuidanceAssistantPage"
import { IssuesPage } from "./pages/IssuesPage"
import { NewIssuePage } from "./pages/NewIssuePage"
import { IssueDetailPage } from "./pages/IssueDetailPage"
import { ProfessionalsPage } from "./pages/ProfessionalsPage"
import { ProfessionalDetailPage } from "./pages/ProfessionalDetailPage"
import { ProfessionalDashboardPage } from "./pages/ProfessionalDashboardPage"
import { InquiriesPage } from "./pages/InquiriesPage"
import { InquiryDetailPage } from "./pages/InquiryDetailPage"
import { SavedResourcesPage } from "./pages/SavedResourcesPage"
import { TemplatesPage } from "./pages/TemplatesPage"
import { TemplateDetailPage } from "./pages/TemplateDetailPage"
import { NotificationsPage } from "./pages/NotificationsPage"
import { NotFoundPage } from "./pages/NotFoundPage"

import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage"
import { AdminUsersPage } from "./pages/admin/AdminUsersPage"
import { AdminProfessionalsPage } from "./pages/admin/AdminProfessionalsPage"
import { AdminResourcesPage } from "./pages/admin/AdminResourcesPage"
import { AdminCategoriesPage } from "./pages/admin/AdminCategoriesPage"
import { AdminArticlesPage } from "./pages/admin/AdminArticlesPage"
import { AdminTemplatesPage } from "./pages/admin/AdminTemplatesPage"

export default function App() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/library" element={<LibraryPage />} />
					<Route path="/library/:id" element={<ResourceDetailPage />} />
					<Route path="/guidance" element={<GuidanceAssistantPage />} />
					<Route path="/professionals" element={<ProfessionalsPage />} />
					<Route path="/professionals/:id" element={<ProfessionalDetailPage />} />
					<Route path="/templates" element={<TemplatesPage />} />
					<Route path="/templates/:id" element={<TemplateDetailPage />} />

					<Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
					<Route path="/issues" element={<ProtectedRoute><IssuesPage /></ProtectedRoute>} />
					<Route path="/issues/new" element={<ProtectedRoute><NewIssuePage /></ProtectedRoute>} />
					<Route path="/issues/:id" element={<ProtectedRoute><IssueDetailPage /></ProtectedRoute>} />
					<Route path="/inquiries" element={<ProtectedRoute roles={["USER"]}><InquiriesPage /></ProtectedRoute>} />
					<Route path="/inquiries/:id" element={<ProtectedRoute><InquiryDetailPage /></ProtectedRoute>} />
					<Route path="/saved" element={<ProtectedRoute roles={["USER"]}><SavedResourcesPage /></ProtectedRoute>} />
					<Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

					<Route path="/professional/dashboard" element={<ProtectedRoute roles={["LAWYER"]}><ProfessionalDashboardPage /></ProtectedRoute>} />

					<Route path="/admin" element={<ProtectedRoute roles={["ADMIN"]}><AdminDashboardPage /></ProtectedRoute>} />
					<Route path="/admin/users" element={<ProtectedRoute roles={["ADMIN"]}><AdminUsersPage /></ProtectedRoute>} />
					<Route path="/admin/professionals" element={<ProtectedRoute roles={["ADMIN"]}><AdminProfessionalsPage /></ProtectedRoute>} />
					<Route path="/admin/resources" element={<ProtectedRoute roles={["ADMIN"]}><AdminResourcesPage /></ProtectedRoute>} />
					<Route path="/admin/categories" element={<ProtectedRoute roles={["ADMIN"]}><AdminCategoriesPage /></ProtectedRoute>} />
					<Route path="/admin/articles" element={<ProtectedRoute roles={["ADMIN"]}><AdminArticlesPage /></ProtectedRoute>} />
					<Route path="/admin/templates" element={<ProtectedRoute roles={["ADMIN"]}><AdminTemplatesPage /></ProtectedRoute>} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}
