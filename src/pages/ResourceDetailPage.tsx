import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import * as resourcesApi from "../api/resources";
import * as savedApi from "../api/savedResources";
import type { LegalResource } from "../types";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { DemoBadge } from "../components/DemoBadge";
import { extractErrorMessage } from "../api/client";
// TEMP: no auth hook wired yet — replace with your real one
function useAuth() {
  return { user: null as null | { id: string } };
}

function formatDate(d?: string | null) {
  if (!d) return null;
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

// Lightweight heading extraction so the reader gets a navigable outline
// without assuming a specific markup format in `content`.
function extractOutline(content: string) {
  const lines = content.split("\n");
  const headingPattern =
    /^(#{1,3}\s+.+|(Chapter|Article|Section)\s+[IVXLC\d]+.*)$/i;
  return lines
    .map((line, i) => ({ line: line.trim(), i }))
    .filter(({ line }) => headingPattern.test(line))
    .map(({ line, i }) => ({
      id: `heading-${i}`,
      text: line.replace(/^#{1,3}\s+/, ""),
    }));
}

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<LegalResource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  function load() {
    if (!id) return;
    setError(null);
    setResource(null);
    resourcesApi
      .getResource(id)
      .then(setResource)
      .catch((e) => setError(extractErrorMessage(e)));
  }

  useEffect(load, [id]);

  useEffect(() => {
    if (!user || !id) return;
    savedApi
      .listSaved()
      .then((items) => setIsSaved(items.some((s) => s.resourceId === id)))
      .catch(() => {});
  }, [user, id]);

  async function toggleSave() {
    if (!user || !id) return;
    const was = isSaved;
    setIsSaved(!was);
    try {
      was ? await savedApi.removeSaved(id) : await savedApi.saveResource(id);
    } catch {
      setIsSaved(was);
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <ErrorState message={error} onRetry={load} />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <LoadingState label="Loading document..." />
      </div>
    );
  }

  const outline = extractOutline(resource.content);
  const published = formatDate(resource.publicationDate);
  const effective = formatDate(resource.effectiveDate);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        to="/library"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Legal Library
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr_260px]">
        {/* Outline nav */}
        {outline.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Outline
              </h2>
              <nav className="space-y-1 text-sm">
                {outline.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block truncate text-slate-500 hover:text-brand-700"
                    title={h.text}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Document content */}
        <main className={outline.length === 0 ? "lg:col-span-2" : ""}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="badge bg-brand-50 text-brand-700">
              {resource.documentType.replace(/_/g, " ")}
            </span>
            {resource.referenceNumber && (
              <span className="text-sm font-medium text-slate-400">
                {resource.referenceNumber}
              </span>
            )}
            {resource.isDemoData && <DemoBadge />}
          </div>

          <h1 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
            {resource.title}
          </h1>
          <p className="mt-3 text-base text-slate-500">
            {resource.description}
          </p>

          <article className="prose prose-slate mt-8 max-w-none whitespace-pre-wrap text-[15px] leading-7 text-slate-800">
            {resource.content}
          </article>
        </main>

        {/* Metadata sidebar */}
        <aside>
          <div className="card sticky top-6 space-y-5">
            {user && (
              <button
                type="button"
                onClick={toggleSave}
                className="btn-secondary w-full gap-2"
                aria-pressed={isSaved}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-brand-600" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                {isSaved ? "Saved" : "Save document"}
              </button>
            )}

            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Details
              </h2>
              <dl className="space-y-2.5 text-sm">
                {resource.category?.name && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Category</dt>
                    <dd className="text-right font-medium text-slate-800">
                      {resource.category.name}
                    </dd>
                  </div>
                )}
                {resource.source && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Institution</dt>
                    <dd className="text-right font-medium text-slate-800">
                      {resource.source}
                    </dd>
                  </div>
                )}
                {published && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Published</dt>
                    <dd className="text-right font-medium text-slate-800">
                      {published}
                    </dd>
                  </div>
                )}
                {effective && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Effective</dt>
                    <dd className="text-right font-medium text-slate-800">
                      {effective}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {resource.keywords.length > 0 && (
              <div>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Keywords
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {resource.keywords.map((k) => (
                    <span key={k} className="badge bg-slate-100 text-slate-600">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resource.sourceUrl && (
              <a
                href={resource.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary block w-full text-center"
              >
                View original source
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
