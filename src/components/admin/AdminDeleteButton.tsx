"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface AdminDeleteButtonProps {
  itemId: string;
  itemName: string;
  deleteAction: (id: string) => Promise<void>;
  confirmMessage?: string;
  title?: string;
}

export default function AdminDeleteButton({
  itemId,
  itemName,
  deleteAction,
  confirmMessage,
  title = "Xóa",
}: AdminDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const msg =
      confirmMessage || `Bạn có chắc chắn muốn xóa "${itemName}" không? Thao tác này không thể hoàn tác.`;

    if (!window.confirm(msg)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAction(itemId);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert(
        "Lỗi khi xóa: " +
          (error instanceof Error ? error.message : "Vui lòng thử lại sau.")
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title={title}
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
