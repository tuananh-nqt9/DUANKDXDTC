import { prisma } from "@/lib/prisma";
import { updateService } from "../actions";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });

  if (!service) notFound();

  const updateAction = updateService.bind(null, service.id);

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sửa dịch vụ</h1>
        <p className="text-gray-500 mt-1">/{service.slug}</p>
      </div>

      <form action={updateAction} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="form-label">Tiêu đề <span className="text-red-500">*</span></label>
          <input type="text" name="title" required defaultValue={service.title} className="form-input" />
        </div>

        <div>
          <label className="form-label">Icon</label>
          <select name="icon" defaultValue={service.icon} className="form-input">
            <option value="FlaskConical">FlaskConical</option>
            <option value="ClipboardCheck">ClipboardCheck</option>
            <option value="Mountain">Mountain</option>
            <option value="HardHat">HardHat</option>
            <option value="Activity">Activity</option>
            <option value="MountainSnow">MountainSnow</option>
          </select>
        </div>

        <div>
          <label className="form-label">Mô tả ngắn</label>
          <textarea name="excerpt" rows={3} defaultValue={service.excerpt || ""} className="form-input" />
        </div>

        <div>
          <label className="form-label">Nội dung chi tiết (HTML)</label>
          <textarea name="content" rows={6} defaultValue={service.content || ""} className="form-input font-mono text-sm" />
        </div>

        <div>
          <label className="form-label">URL hình ảnh</label>
          <input type="url" name="image" defaultValue={service.image || ""} className="form-input" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Thứ tự</label>
            <input type="number" name="order" defaultValue={service.order} className="form-input" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="published" defaultChecked={service.published} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium text-gray-700">Hiển thị</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">Cập nhật</button>
          <a href="/admin/services" className="btn-secondary !text-gray-700 !border-gray-300 hover:!bg-gray-50">Hủy</a>
        </div>
      </form>
    </div>
  );
}
