"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@thanhchuong.vn");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Logo variant="full" theme="light" />
          </Link>
          <p className="text-primary-200 mt-3 text-sm">Hệ thống quản trị website</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-primary-600">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập Admin</h1>
          <p className="text-gray-500 text-sm mb-6">Nhập thông tin đăng nhập để tiếp tục</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-11 focus:ring-primary-500"
                  placeholder="admin@thanhchuong.vn"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-11 focus:ring-primary-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-primary-50 rounded-lg text-xs text-primary-800 border border-primary-200">
            <strong>🎯 Tài khoản demo:</strong>
            <div className="mt-1 font-mono">admin@thanhchuong.vn / admin123</div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-primary-200 text-sm hover:text-white inline-flex items-center gap-1">
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
