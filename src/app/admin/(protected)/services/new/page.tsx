import { prisma } from "@/lib/prisma";
import { createService } from "../actions";

export default async function NewServicePage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Thêm dịch vụ mới</h1>
        <p className="text-gray-500 mt-1">Điền thông tin dịch vụ bên dưới</p>
      </div>

      <form action={createService} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="form-label">Tiêu đề <span className="text-red-500">*</span></label>
          <input type="text" name="title" required className="form-input" placeholder="VD: Thí nghiệm Vật liệu XD" />
        </div>

        <div>
          <label className="form-label">Icon (Lucide icon name)</label>
          <select name="icon" className="form-input">
            <option value="FlaskConical">FlaskConical - Ống nghiệm</option>
            <option value="ClipboardCheck">ClipboardCheck - Kẹp giấy</option>
            <option value="Mountain">Mountain - Núi</option>
            <option value="HardHat">HardHat - Mũ bảo hộ</option>
            <option value="Activity">Activity - Hoạt động</option>
            <option value="MountainSnow">MountainSnow - Núi tuyết</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Xem tất cả icons: <a href="https://lucide.dev/icons" target="_blank" className="text-primary-600 underline">lucide.dev/icons</a>
          </p>
        </div>

        <div>
          <label className="form-label">Mô tả ngắn</label>
          <textarea name="excerpt" rows={3} className="form-input" placeholder="Mô tả ngắn gọn..." />
        </div>

        <div>
          <label className="form-label">Nội dung chi tiết (HTML)</label>
          <textarea name="content" rows={6} className="form-input font-mono text-sm" placeholder="<p>Nội dung chi tiết...</p>" />
        </div>

        <div>
          <label className="form-label">URL hình ảnh</label>
          <input type="url" name="image" className="form-input" placeholder="https://..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Thứ tự hiển thị</label>
            <input type="number" name="order" defaultValue={0} className="form-input" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="published" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-sm font-medium text-gray-700">Hiển thị ngay</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">Tạo dịch vụ</button>
          <a href="/admin/services" className="btn-secondary !text-gray-700 !border-gray-300 hover:!bg-gray-50">Hủy</a>
        </div>
      </form>
    </div>
  );
}

