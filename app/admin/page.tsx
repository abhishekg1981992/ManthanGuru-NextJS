"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "./_lib/auth-context";
import { api, extractArray, formatDisplayDate } from "./_lib/api";
import type { Client, Policy, Renewal } from "./_lib/types";
import {
  Users,
  FileText,
  CalendarClock,
  ShieldAlert,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface DashboardStats {
  clients: number;
  policies: number;
  upcomingRenewals: number;
  activePolicies: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [clientsRaw, policiesRaw, renDueRaw] = await Promise.all([
          api.get("/api/clients"),
          api.get("/api/policies/all-with-details"),
          api.get("/api/renewals/due"),
        ]);
        const clients = extractArray<Client>(clientsRaw);
        const policies = extractArray<Policy>(policiesRaw);
        const renDue = extractArray<Renewal>(renDueRaw);
        setStats({
          clients: clients.length,
          policies: policies.length,
          upcomingRenewals: renDue.length,
          activePolicies: policies.filter((p) => p.status === "active").length,
        });
        setRenewals(renDue.slice(0, 5));
      } catch {
        // stats will remain null
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const formatDate = formatDisplayDate;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#0b6b3a]" size={32} />
      </div>
    );
  }

  const cards = [
    {
      label: "Total Clients",
      value: stats?.clients ?? 0,
      icon: Users,
      href: "/admin/clients",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Policies",
      value: stats?.policies ?? 0,
      icon: FileText,
      href: "/admin/policies",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Active Policies",
      value: stats?.activePolicies ?? 0,
      icon: ShieldAlert,
      href: "/admin/policies",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Upcoming Renewals",
      value: stats?.upcomingRenewals ?? 0,
      icon: CalendarClock,
      href: "/admin/renewals",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome, {user?.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${c.color}`}>
                <c.icon size={22} />
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{c.value}</p>
            <p className="text-sm text-gray-500 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      {renewals.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Upcoming Renewals</h3>
            <Link
              href="/admin/renewals"
              className="text-sm text-[#0b6b3a] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">Policy #</th>
                  <th className="pb-2 font-medium">Provider</th>
                  <th className="pb-2 font-medium">Premium</th>
                  <th className="pb-2 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {renewals.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2.5">{r.client_name}</td>
                    <td className="py-2.5">{r.policy_number}</td>
                    <td className="py-2.5">{r.provider}</td>
                    <td className="py-2.5">
                      {r.premium_amount
                        ? `₹${Number(r.premium_amount).toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td className="py-2.5">{formatDisplayDate(r.end_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
