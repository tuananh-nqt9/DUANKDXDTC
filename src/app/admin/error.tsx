"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, LayoutDashboard, LogIn } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Area Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-9 h-9" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sự cố trong Trang Quản trị
        </h2>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Không thể tải dữ liệu trang quản lý này do sự cố kết nối hoặc dữ liệu không đồng bộ.
          Hệ thống đã ghi lại thông tin kỹ thuật để kiểm tra.
        </p>

        {error.digest && (
          <div className="mb-6 p-2.5 bg-gray-50 rounded-lg text-xs font-mono text-gray-500 border border-gray-200">
            Mã lỗi: {error.digest}
          </div>
        )}

        <div className="space-y-2.5">
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-600/20"
          >
            <RotateCcw className="w-4 h-4" />
            Thử tải lại trang
          </button>

          <Link
            href="/admin/dashboard"
            className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Về Bảng điều khiển Admin
          </Link>

          <Link
            href="/admin/login"
            className="w-full py-2.5 px-4 text-gray-500 hover:text-gray-700 font-medium text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            Đăng nhập lại
          </Link>
        </div>
      </div>
    </div>
  );
}
