"use client";

import { useEffect, useState, useMemo } from "react";
import { api, extractArray, formatDisplayDate } from "../_lib/api";
import type { Renewal } from "../_lib/types";
import { Loader2, Phone } from "lucide-react";

type FilterTab = "today" | "week" | "month";

export default function RenewalsPage() {
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<FilterTab>("month");

  useEffect(() => {
    api
      .get("/api/renewals/due")
      .then((res) => setRenewals(extractArray<Renewal>(res)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = formatDisplayDate;

  const filtered = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    // End of today
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // End of this week (Sunday)
    const endOfWeek = new Date(endOfToday);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));

    // End of this month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return renewals.filter((r) => {
      if (!r.end_date) return false;
      const endDate = new Date(r.end_date);

      switch (tab) {
        case "today":
          return r.end_date === todayStr;
        case "week":
          return endDate <= endOfWeek;
        case "month":
          return endDate <= endOfMonth;
        default:
          return true;
      }
    });
  }, [renewals, tab]);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Renewals Due</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? "bg-[#0b6b3a] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#0b6b3a]" size={28} />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No renewals due for this period.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium hidden md:table-cell">Phone</th>
                  <th className="pb-2 font-medium">Policy #</th>
                  <th className="pb-2 font-medium hidden md:table-cell">Provider</th>
                  <th className="pb-2 font-medium hidden lg:table-cell">Type</th>
                  <th className="pb-2 font-medium">Premium</th>
                  <th className="pb-2 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const isOverdue = new Date(r.end_date) < new Date(new Date().toISOString().split("T")[0]);
                  return (
                    <tr
                      key={r.id}
                      className={`border-b last:border-0 ${
                        isOverdue ? "bg-red-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-2.5 font-medium text-gray-800">
                        {r.client_name}
                      </td>
                      <td className="py-2.5 hidden md:table-cell">
                        <a
                          href={`tel:${r.client_phone}`}
                          className="inline-flex items-center gap-1 text-[#0b6b3a] hover:underline"
                        >
                          <Phone size={13} />
                          {r.client_phone}
                        </a>
                      </td>
                      <td className="py-2.5">{r.policy_number}</td>
                      <td className="py-2.5 hidden md:table-cell">{r.provider}</td>
                      <td className="py-2.5 hidden lg:table-cell">
                        {r.policy_type || "—"}
                      </td>
                      <td className="py-2.5">
                        {r.premium_amount
                          ? `₹${Number(r.premium_amount).toLocaleString("en-IN")}`
                          : "—"}
                      </td>
                      <td className="py-2.5">
                        <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                          {formatDate(r.end_date)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
