"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, formatDisplayDate } from "../../_lib/api";
import type { Client, Policy, Document } from "../../_lib/types";
import { useAuth } from "../../_lib/auth-context";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Loader2,
  Upload,
  FileText,
  Eye,
  Download,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://mg-mobile-admin-production.up.railway.app";

interface ClientDetail extends Client {
  policies?: (Policy & { documents?: Document[] })[];
  documents?: Document[];
}

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingDocId, setDeletingDocId] = useState<number | null>(null);
  const [docMessage, setDocMessage] = useState("");

  useEffect(() => {
    api
      .get<ClientDetail>(`/api/clients/${id}`)
      .then(setClient)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = formatDisplayDate;

  function getDocUrl(doc: Document): string | null {
    if (doc.url) return doc.url;
    if (doc.path) {
      // New uploads: Cloudinary HTTPS URL stored directly in path
      if (doc.path.startsWith('http')) return doc.path;
      // Legacy: relative path served by backend
      const cleanPath = doc.path.replace(/\\/g, "/").replace(/^\/?(app\/)?/, "");
      return `${API_BASE}/${cleanPath}`;
    }
    return null;
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      await api.post(`/api/clients/${id}/doc`, fd);
      const updated = await api.get<ClientDetail>(`/api/clients/${id}`);
      setClient(updated);
    } catch (err) {
      alert((err as Error).message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this client?")) return;
    setDeleting(true);
    try {
      await api.delete(`/api/clients/${id}`);
      router.push("/admin/clients");
    } catch (err) {
      alert((err as Error).message || "Delete failed");
      setDeleting(false);
    }
  }

  async function handleDownload(url: string, filename: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const mimeType = blob.type || "application/octet-stream";
      const typedBlob = new Blob([blob], { type: mimeType });
      const downloadUrl = window.URL.createObjectURL(typedBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      // Ensure filename has extension derived from URL if missing
      const urlExt = url.split("?")[0].split(".").pop();
      const hasExt = filename.includes(".");
      link.download = hasExt ? filename : `${filename}.${urlExt}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert((err as Error).message || "Download failed");
    }
  }

  async function handleView(url: string, filename?: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load document");
      const blob = await response.blob();
      const ext = filename?.split(".").pop()?.toLowerCase();
      const mimeType = ext === "pdf" ? "application/pdf"
        : blob.type && blob.type !== "application/octet-stream" ? blob.type
        : "application/octet-stream";
      const typedBlob = new Blob([blob], { type: mimeType });
      const blobUrl = window.URL.createObjectURL(typedBlob);
      window.open(blobUrl, "_blank");
    } catch (err) {
      alert((err as Error).message || "Failed to open document");
    }
  }

  async function handleDeleteDoc(docId: number) {
    if (!confirm("Are you sure you want to delete this document?")) return;
    setDeletingDocId(docId);
    setDocMessage("");
    try {
      await api.delete(`/api/clients/doc/${docId}`);
      setDocMessage("Document deleted successfully");
      const updated = await api.get<ClientDetail>(`/api/clients/${id}`);
      setClient(updated);
      setTimeout(() => setDocMessage(""), 3000);
    } catch (err) {
      alert((err as Error).message || "Failed to delete document");
    } finally {
      setDeletingDocId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#0b6b3a]" size={32} />
      </div>
    );
  }

  if (!client) {
    return <p className="text-center text-gray-500 py-20">Client not found.</p>;
  }

  const info = [
    { label: "Phone", value: client.phone },
    { label: "Email", value: client.email },
    { label: "Address", value: client.address },
    { label: "City", value: client.city },
    { label: "State", value: client.state },
    { label: "Pincode", value: client.pincode },
    { label: "Date of Birth", value: formatDate(client.dob) },
    { label: "Nominee", value: client.nominee },
    { label: "Notes", value: client.notes },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 flex-1">
          {client.name}
        </h2>
        <Link
          href={`/admin/clients/${id}/edit?from=details`}
          className="inline-flex items-center gap-2 bg-[#0b6b3a] hover:bg-[#095a30] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Pencil size={16} />
          Edit
        </Link>
        {user?.role === "admin" && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            {deleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            Delete
          </button>
        )}
      </div>

      {/* Client Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Client Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.map((item) => (
            <div key={item.label}>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-sm text-gray-800 mt-0.5">
                {item.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Policies</h3>
          <Link
            href={`/admin/policies/new?client_id=${id}`}
            className="text-sm text-[#0b6b3a] hover:underline"
          >
            + Add Policy
          </Link>
        </div>
        {(!client.policies || client.policies.length === 0) ? (
          <p className="text-sm text-gray-500">No policies linked.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Policy #</th>
                  <th className="pb-2 font-medium">Provider</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Premium</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">End Date</th>
                </tr>
              </thead>
              <tbody>
                {client.policies.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-2.5">
                      <Link
                        href={`/admin/policies/${p.id}`}
                        className="text-[#0b6b3a] hover:underline"
                      >
                        {p.policy_number}
                      </Link>
                    </td>
                    <td className="py-2.5">{p.provider}</td>
                    <td className="py-2.5">{p.policy_type || "—"}</td>
                    <td className="py-2.5">
                      {p.premium_amount
                        ? `₹${Number(p.premium_amount).toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          p.status === "active"
                            ? "bg-green-100 text-green-700"
                            : p.status === "lapsed"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.status || "—"}
                      </span>
                    </td>
                    <td className="py-2.5">{formatDate(p.end_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Client Documents */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Client Documents</h3>
          <label className="inline-flex items-center gap-2 bg-[#0b6b3a] hover:bg-[#095a30] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            {uploading ? "Uploading..." : "Upload"}
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
        {docMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2 mb-3">
            {docMessage}
          </div>
        )}
        {(!client.documents || client.documents.length === 0) ? (
          <p className="text-sm text-gray-500">No client documents uploaded.</p>
        ) : (
          <div className="space-y-2">
            {client.documents.map((doc) => {
              const docUrl = getDocUrl(doc);
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <FileText size={18} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700 flex-1 truncate">
                    {doc.original_name || doc.filename}
                  </span>
                  {docUrl && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleView(docUrl, doc.original_name || doc.filename)}
                        className="p-1.5 text-[#0b6b3a] hover:text-[#095a30] transition-colors cursor-pointer"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDownload(docUrl, doc.original_name || doc.filename)}
                        className="p-1.5 text-[#0b6b3a] hover:text-[#095a30] transition-colors cursor-pointer"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    disabled={deletingDocId === doc.id}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                    title="Delete"
                  >
                    {deletingDocId === doc.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Policy List */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Policy List</h3>
        {(!client.policies || client.policies.length === 0) ? (
          <p className="text-sm text-gray-500">No policies linked.</p>
        ) : (
          <div className="space-y-2">
            {client.policies.map((p) => (
              <Link
                key={p.id}
                href={`/admin/policies/${p.id}`}
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-sm font-medium text-[#0b6b3a]">
                  {p.policy_number}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {p.provider} • {p.policy_type || "—"}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
