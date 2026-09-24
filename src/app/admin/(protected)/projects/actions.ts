"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function toggleProjectPublish(id: string) {
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return;
  await prisma.project.update({ where: { id }, data: { published: !p.published } });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const client = formData.get("client") as string;
  const location = formData.get("location") as string;
  const yearStr = formData.get("year") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  await prisma.project.create({
    data: {
      title,
      slug: slugify(title),
      client: client || null,
      location: location || null,
      year: yearStr ? parseInt(yearStr, 10) : null,
      category: category || null,
      excerpt: excerpt || null,
      content: content || null,
      image: image || null,
      featured,
      published,
    },
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const client = formData.get("client") as string;
  const location = formData.get("location") as string;
  const yearStr = formData.get("year") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  await prisma.project.update({
    where: { id },
    data: {
      title,
      client: client || null,
      location: location || null,
      year: yearStr ? parseInt(yearStr, 10) : null,
      category: category || null,
      excerpt: excerpt || null,
      content: content || null,
      image: image || null,
      featured,
      published,
    },
  });

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
