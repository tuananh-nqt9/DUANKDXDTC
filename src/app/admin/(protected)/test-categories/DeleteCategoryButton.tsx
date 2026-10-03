"use client";

import { Trash2 } from "lucide-react";
import { deleteCategory } from "./actions";

export default function DeleteCategoryButton({ id }: { id: string }) {
  return (
    <form
      action={deleteCategory}
      onSubmit={(e) => {
        if (!confirm("Bạn có chắc muốn xóa danh mục này? Tất cả các phép thử trong danh mục cũng sẽ bị xóa.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
        title="Xóa"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
