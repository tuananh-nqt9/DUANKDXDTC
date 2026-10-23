"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUniqueSlug } from "@/lib/slug-utils";

export async function revalidateEquipmentPages(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/trang-thiet-bi");
    if (slug) {
      revalidatePath(`/trang-thiet-bi/${slug}`);
    }
    revalidatePath("/trang-thiet-bi/[slug]", "page");
    revalidatePath("/admin/equipment");
    revalidatePath("/", "layout");
  } catch (error) {
    console.warn("Revalidation warning in equipment:", error);
  }
}

export async function toggleEquipmentPublish(id: string) {
  try {
    const item = await prisma.equipment.findUnique({ where: { id } });
    if (!item) return;

    const updated = await prisma.equipment.update({
      where: { id },
      data: { published: !item.published },
    });

    await revalidateEquipmentPages(updated.slug);
  } catch (error) {
    console.error("Error toggling equipment publish:", error);
  }
}

export async function toggleEquipmentFeatured(id: string) {
  try {
    const item = await prisma.equipment.findUnique({ where: { id } });
    if (!item) return;

    const updated = await prisma.equipment.update({
      where: { id },
      data: { featured: !item.featured },
    });

    await revalidateEquipmentPages(updated.slug);
  } catch (error) {
    console.error("Error toggling equipment featured:", error);
  }
}

export async function deleteEquipment(id: string) {
  try {
    const item = await prisma.equipment.findUnique({ where: { id } });
    if (!item) return;

    await prisma.equipment.delete({ where: { id } });
    await revalidateEquipmentPages(item.slug);
  } catch (error) {
    console.error("Error deleting equipment:", error);
  }
}
