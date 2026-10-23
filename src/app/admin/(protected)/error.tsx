"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, LayoutDashboard } from "lucide-react";

export default function ProtectedAdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Section Error:", error);
  }, [error]);

  return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Không thể tải dữ liệu trang quản trị
        </h2>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Đã xảy ra sự cố khi tải trang này. Vui lòng kiểm tra lại kết nối cơ sở dữ liệu hoặc thử tải lại.
        </p>

        {error.digest && (
          <div className="mb-6 p-2 bg-gray-50 rounded-lg text-xs font-mono text-gray-500 border border-gray-200">
            Mã tham chiếu: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto py-2.5 px-5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Thử tải lại
          </button>

          <Link
            href="/admin/dashboard"
            className="w-full sm:w-auto py-2.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Về Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
