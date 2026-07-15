"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, Copy, Edit3, ExternalLink, FileUp, Loader2, Plus, Printer, RefreshCw, Search, Trash2 } from "lucide-react";
import type { AdminField, AdminModuleKey, AdminModuleDefinition } from "@/lib/admin-modules";

type Metric = { label: string; value: string; note: string };
type Row = Record<string, unknown> & { id?: string; _title?: string; _meta?: string; _status?: string; _value?: string };
type Payload = { definition: AdminModuleDefinition; metrics: Metric[]; rows: Row[] };

function emptyValue(field: AdminField) {
  if (field.type === "checkbox") return true;
  if (field.type === "number") return 0;
  if (field.type === "json") return "{}";
  if (field.type === "select") return field.options?.[0]?.value || "";
  return "";
}

async function safeJson(response: Response) {
  const text = await response.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an invalid response" };
  }
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function prepareEditable(row: Row, fields: AdminField[]) {
  const next: Record<string, unknown> = {};
  fields.forEach((field) => {
    const value = row[field.name];
    next[field.name] = field.type === "json" ? JSON.stringify(value || {}, null, 2) : value ?? emptyValue(field);
  });
  return next;
}

type AdminModulePageProps = {
  module: AdminModuleKey;
  initialQuery?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
};

export function AdminModulePage({ module, initialQuery = "", title, eyebrow, description }: AdminModulePageProps) {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const definition = payload?.definition;
  const displayTitle = title || definition?.title || "Loading";
  const displayEyebrow = eyebrow || definition?.eyebrow || "Admin";
  const displayDescription = description || definition?.description || "Loading real Supabase records...";

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/modules/${module}`, { cache: "no-store" });
      const data = await safeJson(response);
      if (!response.ok) throw new Error(data.error || "Module load failed");
      setPayload(data);
      setRows(data.rows || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Module load failed");
    } finally {
      setLoading(false);
    }
  }, [module]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery, module]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredRows = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(text));
  }, [query, rows]);

  const openCreate = () => {
    if (!definition) return;
    setEditingId(null);
    setEditing(Object.fromEntries(definition.fields.map((field) => [field.name, emptyValue(field)])));
  };

  const openEdit = (row: Row) => {
    if (!definition || !row.id) return;
    setEditingId(String(row.id));
    setEditing(prepareEditable(row, definition.fields));
  };

  const save = async () => {
    if (!definition || !editing) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch(editingId ? `/api/admin/modules/${module}/${editingId}` : `/api/admin/modules/${module}`, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await safeJson(response);
      if (!response.ok) throw new Error(data.error || "Save failed");
      setNotice(`${definition.title} saved to Supabase.`);
      setEditing(null);
      setEditingId(null);
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!definition || !row.id) return;
    if (!window.confirm(`Delete ${row._title || "this record"} from ${definition.title}?`)) return;
    setError("");
    const response = await fetch(`/api/admin/modules/${module}/${encodeURIComponent(String(row.id))}`, { method: "DELETE" });
    const data = await safeJson(response);
    if (!response.ok) {
      setError(data.error || "Delete failed");
      return;
    }
    setNotice(`${row._title || "Record"} deleted.`);
    await load();
  };

  const exportCsv = () => {
    window.location.href = `/api/admin/modules/${module}?format=csv`;
  };

  const printSelected = async () => {
    const orderIds = selected.length ? selected : rows.map((row) => String(row.id)).filter(Boolean);
    if (!orderIds.length) {
      setError("No orders selected for printing.");
      return;
    }
    const response = await fetch(`/api/admin/modules/print-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_ids: orderIds }),
    });
    const data = await safeJson(response);
    if (!response.ok) {
      setError(data.error || "Print log failed");
      return;
    }
    setNotice(`${orderIds.length} order slip${orderIds.length === 1 ? "" : "s"} logged. Opening print dialog.`);
    window.print();
    await load();
  };

  const uploadMedia = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSaving(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("bucket", "products");
      const response = await fetch("/api/admin/modules/media", { method: "POST", body: form });
      const data = await safeJson(response);
      if (!response.ok) throw new Error(data.error || "Upload failed");
      setNotice("Media uploaded to Supabase Storage.");
      await load();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setSaving(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const primaryAction = () => {
    if (module === "reports") return exportCsv();
    if (module === "print-orders") return printSelected();
    if (module === "media") return fileRef.current?.click();
    openCreate();
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">{displayEyebrow}</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold tracking-tight text-[#111] sm:text-5xl">
            {displayTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-500">{displayDescription}</p>
          {notice && <p className="mt-2 text-xs font-semibold text-[#0d6b3f]">{notice}</p>}
          {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d6b3f] ring-1 ring-black/5"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d6b3f] ring-1 ring-black/5"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={primaryAction}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d6b3f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : module === "print-orders" ? <Printer className="h-4 w-4" /> : module === "media" ? <FileUp className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {definition?.primaryAction || "Action"}
          </button>
          <input ref={fileRef} type="file" className="hidden" onChange={uploadMedia} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {(payload?.metrics || []).map((metric, index) => (
          <div key={metric.label} className={`rounded-[26px] p-5 shadow-sm ${index === 0 ? "bg-[#0d6b3f] text-white" : "bg-white text-[#111]"}`}>
            <p className={`text-sm font-semibold ${index === 0 ? "text-white" : "text-neutral-500"}`}>{metric.label}</p>
            <p className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{metric.value}</p>
            <p className={`mt-2 text-xs ${index === 0 ? "text-white/65" : "text-neutral-500"}`}>{metric.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-14 w-full rounded-[20px] bg-[#f4f6f3] pl-11 pr-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
              placeholder={`Search ${displayTitle.toLowerCase()}...`}
            />
          </label>
          {module === "print-orders" && (
            <button type="button" onClick={printSelected} className="rounded-[20px] border border-black/10 px-5 py-4 text-sm font-semibold text-[#0d6b3f]">
              Print {selected.length || "All"}
            </button>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-semibold text-neutral-500">
            <Loader2 className="h-5 w-5 animate-spin text-[#0d6b3f]" />
            Loading Supabase records
          </div>
        ) : filteredRows.length ? (
          <div className="divide-y divide-black/5">
            {filteredRows.map((row) => (
              <div key={String(row.id || row._title)} className="grid gap-4 p-4 transition hover:bg-[#f8faf7] lg:grid-cols-[auto_1.4fr_1fr_0.7fr_auto] lg:items-center lg:px-5">
                {module === "print-orders" ? (
                  <input
                    type="checkbox"
                    checked={selected.includes(String(row.id))}
                    onChange={(event) =>
                      setSelected((current) => event.target.checked ? [...current, String(row.id)] : current.filter((id) => id !== String(row.id)))
                    }
                    aria-label={`Select ${row._title}`}
                    className="h-5 w-5 rounded border-black/10 accent-[#0d6b3f]"
                  />
                ) : (
                  <span className="hidden h-2 w-2 rounded-full bg-[#0d6b3f] lg:block" />
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#111]">{row._title}</p>
                  <p className="mt-1 truncate text-xs text-neutral-500">{row._meta || String(row.id || "")}</p>
                </div>
                <span className="w-fit rounded-full bg-[#e5f4ec] px-3 py-1 text-xs font-semibold text-[#0d6b3f]">{row._status}</span>
                <p className="text-sm font-semibold">{row._value}</p>
                <div className="flex items-center justify-end gap-1">
                  {module === "media" && row.url ? (
                    <>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(String(row.url))}
                        className="rounded-xl p-2 text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]"
                        aria-label={`Copy ${row._title} URL`}
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <Link href={String(row.url)} target="_blank" className="rounded-xl p-2 text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]" aria-label={`Open ${row._title}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </>
                  ) : definition?.fields.length ? (
                    <button onClick={() => openEdit(row)} className="rounded-xl p-2 text-neutral-500 hover:bg-[#eef5f1] hover:text-[#0d6b3f]" type="button" aria-label={`Edit ${row._title}`}>
                      <Edit3 className="h-4 w-4" />
                    </button>
                  ) : null}
                  {module !== "reports" && module !== "print-orders" && (
                    <button onClick={() => remove(row)} className="rounded-xl p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600" type="button" aria-label={`Delete ${row._title}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <details className="lg:col-span-5">
                  <summary className="cursor-pointer text-xs font-semibold text-neutral-400">Record details</summary>
                  <dl className="mt-3 grid gap-2 rounded-2xl bg-[#f4f6f3] p-4 text-xs sm:grid-cols-2 xl:grid-cols-4">
                    {Object.entries(row)
                      .filter(([key]) => !key.startsWith("_"))
                      .slice(0, 16)
                      .map(([key, value]) => (
                        <div key={key}>
                          <dt className="font-semibold uppercase tracking-wider text-neutral-400">{key}</dt>
                          <dd className="mt-1 break-words text-neutral-700">{formatValue(value)}</dd>
                        </div>
                      ))}
                  </dl>
                </details>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid min-h-64 place-items-center p-8 text-center">
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-3xl font-semibold">No records found</p>
              <p className="mt-2 text-sm text-neutral-500">Use the primary action above to create the first real Supabase record.</p>
            </div>
          </div>
        )}
      </section>

      {editing && definition && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="admin-module-editor">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d6b3f]">{definition.eyebrow}</p>
                <h2 id="admin-module-editor" className="font-[family-name:var(--font-playfair)] text-4xl font-semibold tracking-tight">
                  {editingId ? "Edit" : "Create"} {definition.title}
                </h2>
              </div>
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold">
                Close
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {definition.fields.map((field) => (
                <label key={field.name} className={field.full || field.type === "textarea" || field.type === "json" ? "sm:col-span-2" : ""}>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">{field.label}</span>
                  {field.type === "textarea" || field.type === "json" ? (
                    <textarea
                      value={String(editing[field.name] ?? "")}
                      onChange={(event) => setEditing({ ...editing, [field.name]: event.target.value })}
                      className="min-h-28 w-full rounded-2xl bg-[#f4f6f3] p-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(editing[field.name] ?? "")}
                      onChange={(event) => setEditing({ ...editing, [field.name]: event.target.value })}
                      className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5"
                    >
                      {(field.options || []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(editing[field.name])}
                      onChange={(event) => setEditing({ ...editing, [field.name]: event.target.checked })}
                      className="h-6 w-6 rounded border-black/10 accent-[#0d6b3f]"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={String(editing[field.name] ?? "")}
                      onChange={(event) => setEditing({ ...editing, [field.name]: field.type === "number" ? Number(event.target.value) : event.target.value })}
                      className="h-14 w-full rounded-2xl bg-[#f4f6f3] px-4 text-sm outline-none ring-1 ring-black/5 focus:ring-[#0d6b3f]/30"
                    />
                  )}
                </label>
              ))}
            </div>

            <button type="button" disabled={saving} onClick={save} className="mt-6 w-full rounded-2xl bg-[#0d6b3f] px-7 py-4 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : "Save to Supabase"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
