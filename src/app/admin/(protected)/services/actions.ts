"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUniqueSlug } from "@/lib/slug-utils";

export async function toggleServicePublish(id: string) {
  try {
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return;
    await prisma.service.update({
      where: { id },
      data: { published: !service.published },
    });
    revalidatePath("/");
    revalidatePath("/dich-vu");
    revalidatePath("/admin/services");
  } catch (error) {
    console.error("Error toggling service publish:", error);
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/dich-vu");
    revalidatePath("/admin/services");
  } catch (error) {
    console.error("Error deleting service:", error);
  }
}

export async function createService(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const icon = (formData.get("icon") as string) || "FlaskConical";
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const content = (formData.get("content") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim() || null;
  const order = parseInt((formData.get("order") as string) || "0", 10);
  const published = formData.get("published") === "on";

  if (!title) {
    throw new Error("Tiêu đề dịch vụ không được để trống");
  }

  const slug = await getUniqueSlug("service", title);

  await prisma.service.create({
    data: {
      title,
      slug,
      icon,
      excerpt,
      content,
      image,
      order,
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/dich-vu");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const icon = (formData.get("icon") as string) || "FlaskConical";
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const content = (formData.get("content") as string)?.trim() || null;
  const image = (formData.get("image") as string)?.trim() || null;
  const order = parseInt((formData.get("order") as string) || "0", 10);
  const published = formData.get("published") === "on";

  if (!title) {
    throw new Error("Tiêu đề dịch vụ không được để trống");
  }

  const slug = await getUniqueSlug("service", title, id);

  await prisma.service.update({
    where: { id },
    data: {
      title,
      slug,
      icon,
      excerpt,
      content,
      image,
      order,
      published,
    },
  });

  revalidatePath("/");
  revalidatePath("/dich-vu");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}
