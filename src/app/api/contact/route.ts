// POST /api/contact
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ họ tên, số điện thoại và nội dung" },
        { status: 400 }
      );
    }

    await prisma.contact.create({
      data: {
        name,
        phone,
        email: email || null,
        service: service || null,
        message,
        status: "new",
      },
    });

    // TODO: Gửi email thông báo cho admin qua Resend/Nodemailer
    // await sendEmail({ to: 'admin@thanhchuong.vn', subject: `Liên hệ mới từ ${name}`, ... })

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
