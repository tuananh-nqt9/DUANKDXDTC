"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Plus,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  GripVertical,
  Eye,
  EyeOff,
  Download,
  FlaskConical,
  Award,
  CheckCircle,
  ClipboardList,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  pdfUrl: string;
  fileSize: string | null;
  order: number;
  published: boolean;
}

const ICON_OPTIONS = [
  { value: "FileText", label: "Tài liệu", Icon: FileText },
  { value: "FlaskConical", label: "Phòng TN", Icon: FlaskConical },
  { value: "Award", label: "Chứng chỉ", Icon: Award },
  { value: "ClipboardList", label: "Danh mục", Icon: ClipboardList },
  { value: "CheckCircle", label: "Giấy phép", Icon: CheckCircle },
];

export default function DocumentsAdminPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "FileText",
    pdfUrl: "",
    fileSize: "",
    order: 0,
    published: true,
  });

  const [editData, setEditData] = useState<Document | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/admin/documents");
      const data = await res.json();
      setDocuments(data);
    } catch {
      setError("Không thể tải danh sách tài liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPdf = async (file: File, isEdit = false) => {
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);

      if (isEdit && editData) {
        setEditData({
          ...editData,
          pdfUrl: data.url,
          fileSize: `${sizeMB} MB`,
        });
      } else {
        setFormData({
          ...formData,
          pdfUrl: data.url,
          fileSize: `${sizeMB} MB`,
        });
      }
      setSuccess("Upload file thành công!");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Upload file thất bại");
      setTimeout(() => setError(""), 3000);
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.pdfUrl) {
      setError("Vui lòng nhập tiêu đề và upload file PDF");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Create failed");

      setFormData({
        title: "",
        description: "",
        icon: "FileText",
        pdfUrl: "",
        fileSize: "",
        order: 0,
        published: true,
      });
      setShowForm(false);
      setSuccess("Tạo tài liệu thành công!");
      setTimeout(() => setSuccess(""), 3000);
      fetchDocuments();
    } catch {
      setError("Tạo tài liệu thất bại");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editData) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/documents/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Update failed");

      setEditingId(null);
      setEditData(null);
      setSuccess("Cập nhật thành công!");
      setTimeout(() => setSuccess(""), 3000);
      fetchDocuments();
    } catch {
      setError("Cập nhật thất bại");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa tài liệu này?")) return;

    try {
      const res = await fetch(`/api/admin/documents/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setSuccess("Xóa thành công!");
      setTimeout(() => setSuccess(""), 3000);
      fetchDocuments();
    } catch {
      setError("Xóa thất bại");
      setTimeout(() => setError(""), 3000);
    }
  };

  const togglePublished = async (doc: Document) => {
    try {
      await fetch(`/api/admin/documents/${doc.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !doc.published }),
      });
      fetchDocuments();
    } catch {
      setError("Cập nhật thất bại");
    }
  };

  const getIconComponent = (iconName: string) => {
    const found = ICON_OPTIONS.find((o) => o.value === iconName);
    if (found) {
      const IconComp = found.Icon;
      return <IconComp className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hồ sơ tài liệu</h1>
          <p className="text-gray-600 text-sm mt-1">
            Quản lý các tài liệu PDF hiển thị trên trang chủ (Hồ sơ năng lực, Giới thiệu PTN, Chứng chỉ...)
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm tài liệu
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary-600" />
            Thêm tài liệu mới
          </h2>

          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Tiêu đề *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="VD: Hồ sơ năng lực công ty"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Icon</label>
                <div className="flex gap-2">
                  {ICON_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: opt.value })}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-all ${
                        formData.icon === opt.value
                          ? "bg-primary-50 border-primary-500 text-primary-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                      title={opt.label}
                    >
                      <opt.Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Mô tả ngắn</label>
              <input
                type="text"
                className="form-input"
                placeholder="VD: Profile tổng quan về THANH CHƯƠNG JSC"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">File PDF *</label>
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadPdf(file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {uploading ? "Đang upload..." : "Chọn file PDF"}
                  </button>
                  {formData.pdfUrl && (
                    <span className="flex items-center gap-1.5 text-sm text-green-600 bg-green-50 px-3 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      {formData.fileSize || "Đã upload"}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="form-label">Thứ tự hiển thị</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Hiển thị trên trang chủ</span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={saving || !formData.title || !formData.pdfUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Lưu tài liệu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {documents.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Chưa có tài liệu nào</p>
            <p className="text-sm mt-1">Bấm &quot;Thêm tài liệu&quot; để bắt đầu</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <div key={doc.id} className="p-5 hover:bg-gray-50 transition-colors">
                {editingId === doc.id && editData ? (
                  /* Edit mode */
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Tiêu đề</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="form-label">Icon</label>
                        <div className="flex gap-2">
                          {ICON_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setEditData({ ...editData, icon: opt.value })}
                              className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-all ${
                                editData.icon === opt.value
                                  ? "bg-primary-50 border-primary-500 text-primary-700"
                                  : "border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              <opt.Icon className="w-4 h-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Mô tả</label>
                      <input
                        type="text"
                        className="form-input"
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Thay file PDF</label>
                        <div className="flex gap-2 items-center">
                          <input
                            ref={editFileInputRef}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadPdf(file, true);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => editFileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50"
                          >
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            Upload file mới
                          </button>
                          <span className="text-xs text-gray-500">
                            {editData.fileSize || ""}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Thứ tự</label>
                        <input
                          type="number"
                          className="form-input"
                          value={editData.order}
                          onChange={(e) => setEditData({ ...editData, order: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditData(null);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <GripVertical className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      doc.published ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {getIconComponent(doc.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${doc.published ? "text-gray-900" : "text-gray-400"}`}>
                        {doc.title}
                      </h3>
                      {doc.description && (
                        <p className="text-sm text-gray-500 truncate">{doc.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                          PDF • {doc.fileSize || "N/A"}
                        </span>
                        <span className="text-xs text-gray-400">
                          Thứ tự: {doc.order}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Xem PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => togglePublished(doc)}
                        className={`p-2 rounded-lg transition-colors ${
                          doc.published
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={doc.published ? "Ẩn" : "Hiện"}
                      >
                        {doc.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(doc.id);
                          setEditData({ ...doc });
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        <p className="font-medium mb-1">💡 Hướng dẫn:</p>
        <ul className="list-disc list-inside space-y-1 text-blue-600">
          <li>Tài liệu sẽ hiển thị trong section &quot;Tải tài liệu&quot; trên trang chủ</li>
          <li>Thay đổi thứ tự bằng số (0, 1, 2...) - số nhỏ hiển thị trước</li>
          <li>Bấm icon con mắt để ẩn/hiện tài liệu</li>
          <li>Có thể upload file PDF mới để thay thế file cũ</li>
        </ul>
      </div>
    </div>
  );
}
