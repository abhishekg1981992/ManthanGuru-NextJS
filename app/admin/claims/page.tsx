"use client";

import { useEffect, useState } from "react";
import { api } from "../_lib/api";
import type { Claim } from "../_lib/types";
import { Loader2, Search } from "lucide-react";

export default function ClaimsListPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Claim[]>("/api/claims")
      .then(setClaims)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function formatDate(d?: string) {
    if (!d) return "—";
    const parts = d.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return d;
  }

  const filtered = claims.filter((c) => {
    const q = search.toLowerCase();
    return (
      (c.policy_number || "").toLowerCase().includes(q) ||
      (c.claim_type || "").toLowerCase().includes(q) ||
      (c.status || "").toLowerCase().includes(q)
    );
  });

  function statusColor(status?: string) {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "settled":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Claims</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by policy number, type, or status..."
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
          <p className="text-center text-gray-500 py-10">No claims found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Policy #</th>
                  <th className="pb-2 font-medium hidden md:table-cell">Type</th>
                  <th className="pb-2 font-medium">Claim Date</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 text-gray-800 font-medium">#{c.id}</td>
                    <td className="py-2.5">{c.policy_number || "—"}</td>
                    <td className="py-2.5 hidden md:table-cell">
                      {c.claim_type || "—"}
                    </td>
                    <td className="py-2.5">{formatDate(c.claim_date)}</td>
                    <td className="py-2.5">
                      {c.amount
                        ? `₹${Number(c.amount).toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(
                          c.status
                        )}`}
                      >
                        {c.status || "—"}
                      </span>
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
