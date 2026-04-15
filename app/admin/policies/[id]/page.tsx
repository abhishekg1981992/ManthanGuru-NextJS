"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, formatDisplayDate } from "../../_lib/api";
import type { Policy } from "../../_lib/types";
import { useAuth } from "../../_lib/auth-context";
import { ArrowLeft, Pencil, Trash2, Loader2 } from "lucide-react";

export default function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api
      .get<Policy>(`/api/policies/${id}`)
      .then(setPolicy)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = formatDisplayDate;

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this policy?")) return;
    setDeleting(true);
    try {
      await api.delete(`/api/policies/${id}`);
      router.push("/admin/policies");
    } catch (err) {
      alert((err as Error).message || "Delete failed");
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#0b6b3a]" size={32} />
      </div>
    );
  }

  if (!policy) {
    return <p className="text-center text-gray-500 py-20">Policy not found.</p>;
  }

  const info = [
    { label: "Policy Number", value: policy.policy_number },
    { label: "Provider", value: policy.provider },
    { label: "Type", value: policy.policy_type },
    {
      label: "Premium",
      value: policy.premium_amount
        ? `₹${Number(policy.premium_amount).toLocaleString("en-IN")}`
        : undefined,
    },
    {
      label: "Sum Assured",
      value: policy.sum_assured
        ? `₹${Number(policy.sum_assured).toLocaleString("en-IN")}`
        : undefined,
    },
    { label: "Start Date", value: formatDate(policy.start_date) },
    { label: "End Date", value: formatDate(policy.end_date) },
    { label: "Frequency", value: policy.frequency },
    { label: "Status", value: policy.status },
    { label: "Client", value: policy.client_name },
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
          Policy: {policy.policy_number}
        </h2>
        <Link
          href={`/admin/policies/${id}/edit?from=details`}
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

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Policy Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {info.map((item) => (
            <div key={item.label}>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-sm text-gray-800 mt-0.5 capitalize">
                {item.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
