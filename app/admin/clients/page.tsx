"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../_lib/api";
import type { Client } from "../_lib/types";
import { useAuth } from "../_lib/auth-context";
import { Plus, Search, Loader2, Trash2, Eye, Pencil } from "lucide-react";

export default function ClientsListPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<Client[]>("/api/clients")
      .then(setClients)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q)
    );
  });

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this client?")) return;
    setDeleting(id);
    try {
      await api.delete(`/api/clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert((err as Error).message || "Failed to delete client");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 bg-[#0b6b3a] hover:bg-[#095a30] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add Client
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
            placeholder="Search by name, phone, or email..."
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
          <p className="text-center text-gray-500 py-10">No clients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Phone</th>
                  <th className="pb-2 font-medium hidden md:table-cell">Email</th>
                  <th className="pb-2 font-medium hidden lg:table-cell">City</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-800">{c.name}</td>
                    <td className="py-2.5">{c.phone}</td>
                    <td className="py-2.5 hidden md:table-cell">{c.email || "—"}</td>
                    <td className="py-2.5 hidden lg:table-cell">{c.city || "—"}</td>
                    <td className="py-2.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/clients/${c.id}`}
                          className="p-1.5 text-gray-500 hover:text-[#0b6b3a] transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/clients/${c.id}/edit`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleDelete(c.id)}
                            disabled={deleting === c.id}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete"
                          >
                            {deleting === c.id ? (
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
