"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
  await prisma.contact.update({
    where: { id },
    data: { status: "read" },
  });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin/dashboard");
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin/dashboard");
}
