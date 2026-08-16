import { useEffect, useState, type FormEvent } from "react";
import * as resourcesApi from "../../api/resources";
import * as categoriesApi from "../../api/categories";
import { LoadingState } from "../../components/LoadingState";
import { StatusBadge } from "../../components/StatusBadge";
import { extractErrorMessage } from "../../api/client";
import type { LegalResource, Category, DocumentType } from "../../types";
export function AdminResourcesPage() {
  const [resources, setResources] = useState<LegalResource[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    categoryId: string;
    documentType: DocumentType;
    source: string;
    content: string;
  }>({
    title: "",
    description: "",
    categoryId: "",
    documentType: "PUBLIC_LEGAL_RESOURCE",
    source: "",
    content: "",
  });

  function load() {
    resourcesApi
      .searchResources({ page: 1, pageSize: 20 })
      .then((r) => setResources(r.items))
      .catch((e) => setError(extractErrorMessage(e)));
    categoriesApi
      .listCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }
  useEffect(load, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    try {
      await resourcesApi.createResource(form);
      setForm({
        title: "",
        description: "",
        categoryId: "",
        documentType: "PUBLIC_LEGAL_RESOURCE",
        source: "",
        content: "",
      });
      load();
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }

  async function onStatus(id: string, status: string) {
    try {
      await resourcesApi.setResourceStatus(id, status);
      load();
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }
  async function onDelete(id: string) {
    try {
      await resourcesApi.deleteResource(id);
      load();
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Manage Legal Resources
      </h1>
      <p className="mt-1 text-xs text-amber-700">
        New resources you add here are real DB entries \u2014 mark them as
        verified only if sourced from an official document.
      </p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={onCreate} className="card mt-6 flex flex-col gap-3">
        <p className="font-semibold text-slate-800">Add Resource</p>
        <input
          required
          placeholder="Title"
          className="input-field"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          required
          placeholder="Short description"
          className="input-field"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-3">
          {/* Category */}
          <select
            required
            className="input-field"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Document Type */}
          <select
            className="input-field"
            value={form.documentType}
            onChange={(e) =>
              setForm({
                ...form,
                documentType: e.target.value as DocumentType,
              })
            }
          >
            {[
              "LAW",
              "REGULATION",
              "PRESIDENTIAL_ORDER",
              "MINISTERIAL_ORDER",
              "LEGAL_ARTICLE",
              "GUIDELINE",
              "PUBLIC_LEGAL_RESOURCE",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <input
          required
          placeholder="Source (e.g. Official Gazette)"
          className="input-field"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />
        <textarea
          required
          rows={4}
          placeholder="Full content"
          className="input-field"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit" className="btn-primary self-start">
          Add Resource
        </button>
      </form>

      {!resources ? (
        <LoadingState />
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {resources.map((r) => (
            <div
              key={r.id}
              className="card flex flex-wrap items-center justify-between gap-3"
            >
              <span className="font-medium text-slate-700">{r.title}</span>
              <div className="flex items-center gap-2">
                <StatusBadge status={r.status} />
                <select
                  className="input-field w-auto"
                  value={r.status}
                  onChange={(e) => onStatus(r.id, e.target.value)}
                >
                  {["DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  className="text-xs text-red-600"
                  onClick={() => onDelete(r.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
