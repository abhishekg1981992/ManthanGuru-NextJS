"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../_lib/api";
import type { Policy } from "../_lib/types";
import { useAuth } from "../_lib/auth-context";
import { Plus, Search, Loader2, Trash2, Eye, Pencil } from "lucide-react";

export default function PoliciesListPage() {
  const { user } = useAuth();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<Policy[]>("/api/policies/all-with-details")
      .then(setPolicies)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function formatDate(d?: string) {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    return `${day}-${m}-${y}`;
  }

  const filtered = policies.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.client_name || "").toLowerCase().includes(q) ||
      p.provider.toLowerCase().includes(q) ||
      p.policy_number.toLowerCase().includes(q)
    );
  });

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this policy?")) return;
    setDeleting(id);
    try {
      await api.delete(`/api/policies/${id}`);
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert((err as Error).message || "Failed to delete policy");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Policies</h2>
        <Link
          href="/admin/policies/new"
          className="inline-flex items-center gap-2 bg-[#0b6b3a] hover:bg-[#095a30] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add Policy
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by client name, provider, or policy number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#0b6b3a]" size={28} />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No policies found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Policy #</th>
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium hidden md:table-cell">Provider</th>
                  <th className="pb-2 font-medium hidden md:table-cell">Type</th>
                  <th className="pb-2 font-medium hidden lg:table-cell">Premium</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium hidden lg:table-cell">End Date</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-800">
                      {p.policy_number}
                    </td>
                    <td className="py-2.5">{p.client_name || "—"}</td>
                    <td className="py-2.5 hidden md:table-cell">{p.provider}</td>
                    <td className="py-2.5 hidden md:table-cell">{p.policy_type || "—"}</td>
                    <td className="py-2.5 hidden lg:table-cell">
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
                            : p.status === "cancelled"
                            ? "bg-gray-100 text-gray-600"
                            : p.status === "matured"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.status || "—"}
                      </span>
                    </td>
                    <td className="py-2.5 hidden lg:table-cell">
                      {formatDate(p.end_date)}
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/policies/${p.id}`}
                          className="p-1.5 text-gray-500 hover:text-[#0b6b3a] transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/policies/${p.id}/edit`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete"
                          >
                            {deleting === p.id ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
