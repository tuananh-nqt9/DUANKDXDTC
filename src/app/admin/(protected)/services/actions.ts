"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function toggleServicePublish(id: string) {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return;
  await prisma.service.update({
    where: { id },
    data: { published: !service.published },
  });
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const icon = (formData.get("icon") as string) || "FlaskConical";
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const order = parseInt((formData.get("order") as string) || "0", 10);
  const published = formData.get("published") === "on";

  await prisma.service.create({
    data: {
      title,
      slug: slugify(title),
      icon,
      excerpt,
      content,
      image: image || null,
      order,
      published,
    },
  });

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const icon = (formData.get("icon") as string) || "FlaskConical";
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const order = parseInt((formData.get("order") as string) || "0", 10);
  const published = formData.get("published") === "on";

  await prisma.service.update({
    where: { id },
    data: { title, icon, excerpt, content, image: image || null, order, published },
  });

  revalidatePath("/admin/services");
  redirect("/admin/services");
}
