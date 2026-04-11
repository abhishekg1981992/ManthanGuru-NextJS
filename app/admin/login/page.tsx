"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_lib/auth-context";
import { healthCheck } from "../_lib/api";
import { Loader2, AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const { login, token } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [backendDown, setBackendDown] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(true);

  useEffect(() => {
    if (token) {
      router.replace("/admin");
      return;
    }
    healthCheck().then((ok) => {
      setBackendDown(!ok);
      setCheckingHealth(false);
    });
  }, [token, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await login(username.trim(), password.trim());
    } catch (err) {
      setError((err as Error).message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingHealth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0b6b3a] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#0b6b3a]">Manthan Guru</h1>
            <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
          </div>

          {backendDown ? (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="text-amber-600 mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-medium text-amber-800">System Maintenance</p>
                <p className="text-sm text-amber-700 mt-1">
                  The backend server is currently unavailable. Please try again
                  later.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0b6b3a] focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#0b6b3a] hover:bg-[#095a30] text-white py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
