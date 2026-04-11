"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../_lib/api";
import type { Policy } from "../../../_lib/types";
import { ArrowLeft, Loader2 } from "lucide-react";

const POLICY_TYPES = ["Life", "Health", "Motor", "Home", "Travel", "Business", "Other"] as const;
const FREQUENCIES = ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "One-Time"] as const;
const STATUSES = ["active", "lapsed", "cancelled", "matured"] as const;

export default function EditPolicyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState({
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Policy>(`/api/policies/${id}`)
      .then((p: Policy) => {
        setForm({
          provider: p.provider || "",
          policy_number: p.policy_number || "",
          policy_type: p.policy_type || "",
          premium_amount: p.premium_amount ? String(p.premium_amount) : "",
          sum_assured: p.sum_assured ? String(p.sum_assured) : "",
          start_date: p.start_date || "",
          end_date: p.end_date || "",
          frequency: p.frequency || "",
          status: p.status || "active",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.provider.trim() || !form.policy_number.trim()) {
      setError("Provider and Policy Number are required");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        premium_amount: form.premium_amount ? Number(form.premium_amount) : undefined,
        sum_assured: form.sum_assured ? Number(form.sum_assured) : undefined,
      };
      await api.put(`/api/policies/${id}`, payload);
      router.push(`/admin/policies/${id}`);
    } catch (err) {
      setError((err as Error).message || "Failed to update policy");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#0b6b3a]" size={32} />
      </div>
    );
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
        <h2 className="text-2xl font-bold text-gray-800">Edit Policy</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option key={s} value={s}>{s}</option>
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
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
