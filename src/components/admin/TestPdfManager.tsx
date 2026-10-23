"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Upload,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  HardDrive,
  Calendar,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  ArrowUp,
  ArrowDown,
  Loader2,
  FileCheck,
  Download,
} from "lucide-react";
import { parseApiResponse } from "@/lib/api-client";

export interface TestPdfItem {
  id: string;
  title: string;
  description: string | null;
  pdfUrl: string;
  fileName: string | null;
  fileSize: string | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TestPdfManager() {
  const [items, setItems] = useState<TestPdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Message alert
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TestPdfItem | null>(null);
  const [replacingItem, setReplacingItem] = useState<TestPdfItem | null>(null);
  const [previewingItem, setPreviewingItem] = useState<TestPdfItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<TestPdfItem | null>(null);

  // Form thêm mới
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPdfUrl, setNewPdfUrl] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileSize, setNewFileSize] = useState("");
  const [newOrder, setNewOrder] = useState(0);
  const [newPublished, setNewPublished] = useState(true);
  const [newPreviewBlob, setNewPreviewBlob] = useState<string | null>(null);

  // Form thay thế
  const [replacePdfUrl, setReplacePdfUrl] = useState("");
  const [replaceFileName, setReplaceFileName] = useState("");
  const [replaceFileSize, setReplaceFileSize] = useState("");
  const [replacePreviewBlob, setReplacePreviewBlob] = useState<string | null>(null);

  const fileInputRefAdd = useRef<HTMLInputElement>(null);
  const fileInputRefReplace = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Dọn dẹp blob URLs
  useEffect(() => {
    return () => {
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  // Tải danh sách PDF
  useEffect(() => {
    fetchPdfList();
  }, []);

  const fetchPdfList = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/test-parameters-pdf", { cache: "no-store" });
      const parsed = await parseApiResponse<{ list: TestPdfItem[] }>(res, "Không thể tải danh sách tài liệu");
      if (!parsed.ok || !parsed.data) throw new Error(parsed.error || "Không thể tải danh sách");
      setItems(parsed.data.list || []);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Lỗi kết nối máy chủ.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Upload file PDF chung (tối đa 50MB)
  const uploadPdfFile = async (file: File): Promise<{ url: string; filename: string; fileSize: string } | null> => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setMessage({ type: "error", text: "Chỉ chấp nhận file định dạng PDF (.pdf)!" });
      return null;
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage({ type: "error", text: "Dung lượng file vượt quá giới hạn 50MB!" });
      return null;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const parsed = await parseApiResponse<{ url: string; filename: string; fileSize?: string; bytes?: number }>(
        res,
        "Tải file PDF lên máy chủ thất bại"
      );

      if (!parsed.ok || !parsed.data?.url) {
        throw new Error(parsed.error || "Upload thất bại");
      }

      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;

      return {
        url: parsed.data.url,
        filename: parsed.data.filename || file.name,
        fileSize: parsed.data.fileSize || sizeFormatted,
      };
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Có lỗi xảy ra khi tải file lên.",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // 1. Xử lý upload file cho Form THÊM MỚI
  const handleFileChangeAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const localBlob = URL.createObjectURL(file);
    blobUrlRef.current = localBlob;
    setNewPreviewBlob(localBlob);

    // Điền tiêu đề mặc định từ tên file nếu chưa có
    if (!newTitle) {
      const cleanName = file.name.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");
      setNewTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    const uploaded = await uploadPdfFile(file);
    if (uploaded) {
      setNewPdfUrl(uploaded.url);
      setNewFileName(uploaded.filename);
      setNewFileSize(uploaded.fileSize);
      setMessage({ type: "success", text: "✓ Đã tải file PDF lên máy chủ thành công!" });
    }
  };

  // Lưu tài liệu mới
  const handleSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setMessage({ type: "error", text: "Vui lòng nhập tiêu đề tài liệu." });
      return;
    }
    if (!newPdfUrl.trim()) {
      setMessage({ type: "error", text: "Vui lòng chọn và tải lên file PDF." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          title: newTitle,
          description: newDescription,
          pdfUrl: newPdfUrl,
          fileName: newFileName,
          fileSize: newFileSize,
          order: Number(newOrder),
          published: newPublished,
        }),
      });

      const parsed = await parseApiResponse<{ list: TestPdfItem[] }>(res, "Không thể lưu tài liệu mới");
      if (!parsed.ok) throw new Error(parsed.error || "Lỗi lưu tài liệu");

      setItems(parsed.data?.list || []);
      setShowAddModal(false);
      resetAddForm();
      setMessage({ type: "success", text: "🎉 Đã thêm tài liệu PDF mới thành công và đồng bộ lên website!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Có lỗi khi lưu tài liệu.",
      });
    } finally {
      setSaving(false);
    }
  };

  const resetAddForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewPdfUrl("");
    setNewFileName("");
    setNewFileSize("");
    setNewOrder(items.length);
    setNewPublished(true);
    setNewPreviewBlob(null);
  };

  // 2. Xử lý THAY THẾ FILE PDF của tài liệu cụ thể
  const handleFileChangeReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const localBlob = URL.createObjectURL(file);
    setReplacePreviewBlob(localBlob);

    const uploaded = await uploadPdfFile(file);
    if (uploaded) {
      setReplacePdfUrl(uploaded.url);
      setReplaceFileName(uploaded.filename);
      setReplaceFileSize(uploaded.fileSize);
      setMessage({ type: "success", text: "✓ Đã tải file PDF mới lên máy chủ thành công!" });
    }
  };

  const handleSaveReplace = async () => {
    if (!replacingItem || !replacePdfUrl) {
      setMessage({ type: "error", text: "Vui lòng chọn file PDF thay thế." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: replacingItem.id,
          pdfUrl: replacePdfUrl,
          fileName: replaceFileName,
          fileSize: replaceFileSize,
        }),
      });

      const parsed = await parseApiResponse<{ list: TestPdfItem[] }>(res, "Không thể thay thế file PDF");
      if (!parsed.ok) throw new Error(parsed.error || "Lỗi thay thế");

      setItems(parsed.data?.list || []);
      setReplacingItem(null);
      setReplacePdfUrl("");
      setReplacePreviewBlob(null);
      setMessage({ type: "success", text: `✓ Đã thay thế file PDF cho "${replacingItem.title}" thành công!` });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Lỗi khi thay thế file PDF.",
      });
    } finally {
      setSaving(false);
    }
  };

  // 3. Xử lý CẬP NHẬT THÔNG TIN (Sửa tiêu đề, mô tả, thứ tự)
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: editingItem.id,
          title: editingItem.title,
          description: editingItem.description,
          order: Number(editingItem.order),
          published: editingItem.published,
        }),
      });

      const parsed = await parseApiResponse<{ list: TestPdfItem[] }>(res, "Không thể cập nhật thông tin");
      if (!parsed.ok) throw new Error(parsed.error || "Lỗi cập nhật");

      setItems(parsed.data?.list || []);
      setEditingItem(null);
      setMessage({ type: "success", text: "✓ Cập nhật thông tin tài liệu thành công!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Lỗi khi cập nhật.",
      });
    } finally {
      setSaving(false);
    }
  };

  // 4. Bật / Tắt công khai nhanh
  const handleTogglePublish = async (item: TestPdfItem) => {
    try {
      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: item.id,
          published: !item.published,
        }),
      });

      const parsed = await parseApiResponse<{ list: TestPdfItem[] }>(res);
      if (parsed.ok && parsed.data?.list) {
        setItems(parsed.data.list);
        setMessage({
          type: "success",
          text: !item.published
            ? `✓ Đã công khai tài liệu "${item.title}" lên website.`
            : `✓ Đã ẩn tài liệu "${item.title}" khỏi website.`,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 5. Thay đổi thứ tự (Lên / Xuống)
  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const currentItem = newItems[index];
    const targetItem = newItems[targetIndex];

    const tempOrder = currentItem.order;
    currentItem.order = targetItem.order;
    targetItem.order = tempOrder;

    // Swap in array
    newItems[index] = targetItem;
    newItems[targetIndex] = currentItem;
    setItems(newItems);

    try {
      await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          items: newItems.map((it, idx) => ({ id: it.id, order: idx })),
        }),
      });
    } catch (e) {
      console.error("Reorder failed", e);
    }
  };

  // 6. Xóa tài liệu
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/test-parameters-pdf?id=${deletingItem.id}`, {
        method: "DELETE",
      });

      const parsed = await parseApiResponse<{ list: TestPdfItem[] }>(res, "Không thể xóa tài liệu");
      if (!parsed.ok) throw new Error(parsed.error || "Lỗi xóa tài liệu");

      setItems(parsed.data?.list || []);
      setDeletingItem(null);
      setMessage({ type: "success", text: `✓ Đã xóa tài liệu "${deletingItem.title}" thành công.` });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Lỗi khi xóa tài liệu.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
      {/* HEADER SECTION */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                LAS-XD 795
              </span>
              <span className="text-xs text-primary-200 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-secondary-400" />
                Đồng bộ Trang chủ &amp; /chi-tieu-phep-thu
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Quản lý Danh mục Tài liệu PDF Chỉ tiêu &amp; Phép thử
            </h2>
            <p className="text-sm md:text-base text-gray-300 mt-1 max-w-2xl">
              Hỗ trợ quản lý nhiều tài liệu PDF độc lập. Bạn có thể thêm không giới hạn các tài liệu công nhận, đề cương, phụ lục hoặc văn bản công bố mà không làm mất tài liệu cũ.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetAddForm();
                setNewOrder(items.length);
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all text-sm"
            >
              <Plus className="w-5 h-5" />
              Thêm tài liệu PDF mới
            </button>
          </div>
        </div>

        {/* THỐNG KÊ NHANH */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-gray-400 block mb-1">Tổng tài liệu PDF:</span>
            <span className="text-xl font-bold text-white">{items.length}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-gray-400 block mb-1">Đang công khai:</span>
            <span className="text-xl font-bold text-green-400">
              {items.filter((it) => it.published).length}
            </span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-gray-400 block mb-1">Đang ẩn:</span>
            <span className="text-xl font-bold text-gray-300">
              {items.filter((it) => !it.published).length}
            </span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-gray-400 block mb-1">Giới hạn tải lên:</span>
            <span className="text-xl font-bold text-secondary-400">Tối đa 50MB</span>
          </div>
        </div>
      </div>

      {/* THÔNG BÁO TRẠNG THÁI */}
      {message.text && (
        <div
          className={`p-4 mx-6 mt-6 rounded-xl flex items-center justify-between text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
          <button
            onClick={() => setMessage({ type: "", text: "" })}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* DANH SÁCH TÀI LIỆU PDF */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            Danh sách tài liệu PDF hiện có ({items.length})
          </h3>
          <span className="text-xs text-gray-500">
            💡 Kéo/thay đổi thứ tự hoặc bấm nút mũi tên để đổi vị trí hiển thị trên trang User
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-600" />
            <span>Đang tải danh sách tài liệu PDF...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Chưa có tài liệu PDF nào.</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              Nhấn nút &quot;Thêm tài liệu PDF mới&quot; để tải lên văn bản chỉ tiêu &amp; phép thử đầu tiên.
            </p>
            <button
              onClick={() => {
                resetAddForm();
                setShowAddModal(true);
              }}
              className="btn-primary !bg-red-600 hover:!bg-red-700"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Thêm tài liệu ngay
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-600">
                <tr>
                  <th className="px-4 py-3.5 text-center w-16">Thứ tự</th>
                  <th className="px-4 py-3.5">Tên tài liệu / Văn bản</th>
                  <th className="px-4 py-3.5">Dung lượng</th>
                  <th className="px-4 py-3.5">Ngày cập nhật</th>
                  <th className="px-4 py-3.5 text-center">Trạng thái</th>
                  <th className="px-4 py-3.5 text-right w-64">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item, index) => {
                  const updatedDate = item.updatedAt
                    ? new Date(item.updatedAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Thứ tự & nút di chuyển */}
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-bold text-gray-700 w-5 text-center">
                            {index + 1}
                          </span>
                          <div className="flex flex-col">
                            <button
                              disabled={index === 0}
                              onClick={() => handleMoveOrder(index, "up")}
                              className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-20"
                              title="Di chuyển lên trên"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={index === items.length - 1}
                              onClick={() => handleMoveOrder(index, "down")}
                              className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-20"
                              title="Di chuyển xuống dưới"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Tài liệu */}
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 text-sm hover:text-primary-600 transition-colors">
                              {item.title}
                            </div>
                            {item.description && (
                              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1 font-mono text-xs text-gray-400">
                              <span className="truncate max-w-xs">{item.fileName || item.pdfUrl}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Dung lượng */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          <HardDrive className="w-3 h-3 text-gray-400" />
                          {item.fileSize || "Không rõ"}
                        </span>
                      </td>

                      {/* Ngày cập nhật */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {updatedDate}
                        </span>
                      </td>

                      {/* Trạng thái */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            item.published
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          title={item.published ? "Nhấn để ẩn tài liệu này" : "Nhấn để công khai tài liệu này"}
                        >
                          {item.published ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-green-600" />
                              Công khai
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                              Đang ẩn
                            </>
                          )}
                        </button>
                      </td>

                      {/* Thao tác */}
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Xem trước */}
                          <button
                            onClick={() => setPreviewingItem(item)}
                            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Xem trước PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Thay thế file PDF riêng */}
                          <button
                            onClick={() => {
                              setReplacingItem(item);
                              setReplacePdfUrl("");
                              setReplacePreviewBlob(null);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Thay thế file PDF này bằng file mới"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Thay PDF
                          </button>

                          {/* Sửa thông tin */}
                          <button
                            onClick={() => setEditingItem({ ...item })}
                            className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Sửa tiêu đề / mô tả"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Xóa */}
                          <button
                            onClick={() => setDeletingItem(item)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa tài liệu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= MODAL 1: THÊM TÀI LIỆU PDF MỚI ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 bg-gradient-to-r from-slate-900 to-primary-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Thêm tài liệu PDF mới</h3>
                  <p className="text-xs text-gray-300">Tài liệu mới sẽ được thêm vào danh sách, giữ nguyên các tài liệu cũ</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Tiêu đề tài liệu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Danh mục chỉ tiêu phép thử năm 2026..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mô tả ngắn (Không bắt buộc)
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Mô tả phạm vi áp dụng hoặc ghi chú bổ sung..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>

              {/* Upload file */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  File tài liệu PDF <span className="text-red-500">*</span> (Tối đa 50MB)
                </label>
                <input
                  ref={fileInputRefAdd}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileChangeAdd}
                />

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  {uploading ? (
                    <div className="py-4 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-600 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">Đang tải file PDF lên máy chủ...</span>
                    </div>
                  ) : newPdfUrl ? (
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="text-left truncate">
                          <span className="text-sm font-bold text-gray-900 block truncate">{newFileName}</span>
                          <span className="text-xs text-gray-500">{newFileSize}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRefAdd.current?.click()}
                        className="text-xs text-primary-600 hover:underline font-semibold"
                      >
                        Chọn file khác
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        Chọn file PDF từ máy tính của bạn
                      </p>
                      <p className="text-xs text-gray-500 mb-3">Định dạng .pdf, dung lượng tối đa 50MB</p>
                      <button
                        type="button"
                        onClick={() => fileInputRefAdd.current?.click()}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold text-xs rounded-lg hover:bg-gray-100 shadow-xs"
                      >
                        Chọn file PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview nhỏ */}
              {(newPreviewBlob || newPdfUrl) && (
                <div>
                  <span className="block text-xs font-bold text-gray-700 mb-1">Khung xem trước nhanh:</span>
                  <div className="h-48 bg-slate-800 rounded-xl overflow-hidden border border-gray-200">
                    <iframe
                      src={newPreviewBlob || newPdfUrl}
                      className="w-full h-full border-0"
                      title="Preview PDF"
                    />
                  </div>
                </div>
              )}

              {/* Tùy chọn thứ tự & công khai */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={newOrder}
                    onChange={(e) => setNewOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPublished}
                      onChange={(e) => setNewPublished(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-800">Công khai ngay lên Website</span>
                  </label>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading || !newPdfUrl}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Lưu &amp; Công khai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: THAY THẾ FILE PDF ================= */}
      {replacingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-300" />
                <h3 className="font-bold text-base text-white">Thay thế file PDF</h3>
              </div>
              <button
                onClick={() => setReplacingItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 text-xs text-blue-900">
                <span className="font-bold block text-sm mb-1 text-blue-950">
                  Tài liệu đang chọn: {replacingItem.title}
                </span>
                <span>File hiện tại: <strong className="font-mono">{replacingItem.fileName || replacingItem.pdfUrl}</strong> ({replacingItem.fileSize})</span>
              </div>

              <input
                ref={fileInputRefReplace}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChangeReplace}
              />

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center bg-gray-50">
                {uploading ? (
                  <div className="py-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Đang tải file PDF mới lên máy chủ...</span>
                  </div>
                ) : replacePdfUrl ? (
                  <div className="bg-white p-3 rounded-lg border border-green-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="text-left truncate">
                        <span className="text-sm font-bold text-gray-900 block truncate">{replaceFileName}</span>
                        <span className="text-xs text-green-600 font-medium">Đã tải lên ({replaceFileSize})</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRefReplace.current?.click()}
                      className="text-xs text-primary-600 hover:underline font-semibold"
                    >
                      Chọn file khác
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-800 font-bold mb-1">Chọn file PDF mới để thay thế</p>
                    <p className="text-xs text-gray-500 mb-3">Chỉ file PDF của tài liệu này được thay đổi, các tài liệu khác giữ nguyên 100%</p>
                    <button
                      type="button"
                      onClick={() => fileInputRefReplace.current?.click()}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg hover:bg-blue-700 shadow-sm"
                    >
                      Duyệt file PDF mới
                    </button>
                  </div>
                )}
              </div>

              {(replacePreviewBlob || replacePdfUrl) && (
                <div>
                  <span className="block text-xs font-semibold text-gray-700 mb-1">Xem trước file mới:</span>
                  <div className="h-44 bg-slate-800 rounded-xl overflow-hidden">
                    <iframe src={replacePreviewBlob || replacePdfUrl} className="w-full h-full border-0" title="Preview New PDF" />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReplacingItem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  disabled={saving || uploading || !replacePdfUrl}
                  onClick={handleSaveReplace}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Xác nhận thay thế
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: SỬA THÔNG TIN TÀI LIỆU ================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-primary-950 text-white flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Chỉnh sửa thông tin tài liệu</h3>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tiêu đề tài liệu</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mô tả</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.published}
                      onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-800">Công khai lên website</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-sm flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: XEM TRƯỚC TÀI LIỆU ================= */}
      {previewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2 truncate pr-4">
                <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="font-bold text-sm truncate">{previewingItem.title}</span>
                <span className="text-xs text-gray-400">({previewingItem.fileSize})</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={previewingItem.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg text-xs inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Tab mới</span>
                </a>
                <a
                  href={previewingItem.pdfUrl}
                  download={previewingItem.fileName || "tai-lieu.pdf"}
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg text-xs inline-flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải về</span>
                </a>
                <button
                  onClick={() => setPreviewingItem(null)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-800">
              <iframe
                src={`${previewingItem.pdfUrl}#toolbar=1&navpanes=1`}
                className="w-full h-full border-0"
                title={previewingItem.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 5: XÁC NHẬN XÓA TÀI LIỆU ================= */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 text-center border border-gray-100">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Xác nhận xóa tài liệu PDF</h3>
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tài liệu: <br />
              <strong className="text-gray-900 font-semibold">&quot;{deletingItem.title}&quot;</strong>?
              <br />
              <span className="text-xs text-red-500 mt-2 block">
                Hành động này sẽ xóa tài liệu khỏi website. Các tài liệu khác sẽ không bị ảnh hưởng.
              </span>
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
