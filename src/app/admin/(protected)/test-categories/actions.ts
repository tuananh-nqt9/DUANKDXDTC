"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCategory(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  try {
    await prisma.testCategory.delete({
      where: { id },
    });
    revalidatePath("/admin/test-categories");
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
