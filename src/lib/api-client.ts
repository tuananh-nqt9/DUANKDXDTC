/**
 * Tiện ích gửi request và trích xuất response an toàn cho Admin & Client.
 * Ngăn chặn triệt để lỗi "Unexpected token '<', <html>... is not valid JSON"
 * khi server trả về trang lỗi HTML (Nginx 413, 502, 504, 500, 401 redirect...).
 */

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export async function parseApiResponse<T = any>(
  res: Response,
  fallbackError = "Yêu cầu máy chủ thất bại"
): Promise<ApiResponse<T>> {
  const status = res.status;
  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  let textBody = "";

  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      textBody = await res.text();
    } catch {}
  }

  if (!res.ok) {
    let error = (data && (data.error || data.message)) || "";

    if (!error) {
      if (status === 413) {
        error =
          "Dung lượng file vượt quá giới hạn cho phép của máy chủ web (Lỗi 413 Request Entity Too Large). Vui lòng cấu hình 'client_max_body_size 64M;' trên Nginx VPS hoặc chọn file dưới 50MB.";
      } else if (status === 401) {
        error = "Phiên làm việc quản trị đã hết hạn (Lỗi 401). Vui lòng tải lại trang và đăng nhập lại.";
      } else if (status === 403) {
        error = "Bạn không có quyền thực hiện thao tác này (Lỗi 403 Forbidden).";
      } else if (status === 404) {
        error = "Đường dẫn API máy chủ không tồn tại (Lỗi 404 Not Found).";
      } else if (status === 502 || status === 504) {
        error = "Máy chủ đang bận, đang khởi động lại hoặc không phản hồi (Lỗi 502/504). Vui lòng thử lại sau giây lát.";
      } else if (status >= 500) {
        error = `Máy chủ gặp sự cố nội bộ (Lỗi HTTP ${status}). Vui lòng kiểm tra log backend.`;
      } else {
        error = fallbackError;
      }
    }

    return { ok: false, status, error };
  }

  return { ok: true, status, data };
}
