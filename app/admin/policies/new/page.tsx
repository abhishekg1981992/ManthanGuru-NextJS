"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "../../_lib/api";
import type { Client } from "../../_lib/types";
import { ArrowLeft, Loader2 } from "lucide-react";

const POLICY_TYPES = ["Life", "Health", "Motor", "Home", "Travel", "Business", "Other"] as const;
const FREQUENCIES = ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "One-Time"] as const;
const STATUSES = ["active", "lapsed", "cancelled", "matured"] as const;

export default function NewPolicyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClientId = searchParams.get("client_id") || "";

  const [clients, setClients] = useState<Client[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    client_id: preselectedClientId,
    provider: "",
    policy_number: "",
    policy_type: "" as string,
    premium_amount: "",
    sum_assured: "",
    start_date: "",
    end_date: "",
    frequency: "" as string,
    status: "active" as string,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get<Client[]>("/api/clients").then((data) => {
      setClients(data);
      if (preselectedClientId) {
        const c = data.find((c) => String(c.id) === preselectedClientId);
        if (c) setClientSearch(c.name);
      }
    });
  }, [preselectedClientId]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.client_id || !form.provider.trim() || !form.policy_number.trim()) {
      setError("Client, Provider, and Policy Number are required");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        client_id: Number(form.client_id),
        premium_amount: form.premium_amount ? Number(form.premium_amount) : undefined,
        sum_assured: form.sum_assured ? Number(form.sum_assured) : undefined,
      };
      await api.post("/api/policies", payload);
      router.push("/admin/policies");
    } catch (err) {
      setError((err as Error).message || "Failed to create policy");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Add New Policy</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Client Autocomplete */}
            <div className="sm:col-span-2 relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  setShowDropdown(true);
                  setForm((prev) => ({ ...prev, client_id: "" }));
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Type to search clients..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
              {showDropdown && filteredClients.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredClients.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, client_id: String(c.id) }));
                        setClientSearch(c.name);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-gray-400 ml-2">{c.phone}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider <span className="text-red-500">*</span>
              </label>
              <input
                name="provider"
                value={form.provider}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Number <span className="text-red-500">*</span>
              </label>
              <input
                name="policy_number"
                value={form.policy_number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Type
              </label>
              <select
                name="policy_type"
                value={form.policy_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none bg-white"
              >
                <option value="">Select type</option>
                {POLICY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none bg-white"
              >
                <option value="">Select frequency</option>
                {FREQUENCIES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Premium Amount
              </label>
              <input
                name="premium_amount"
                type="number"
                value={form.premium_amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sum Assured
              </label>
              <input
                name="sum_assured"
                type="number"
                value={form.sum_assured}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                name="start_date"
                type="date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                name="end_date"
                type="date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none bg-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-[#0b6b3a] hover:bg-[#095a30] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Creating..." : "Create Policy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
