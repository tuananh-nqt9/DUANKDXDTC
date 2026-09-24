"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function togglePostPublish(id: string) {
  const p = await prisma.post.findUnique({ where: { id } });
  if (!p) return;
  await prisma.post.update({ where: { id }, data: { published: !p.published } });
  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const published = formData.get("published") === "on";

  await prisma.post.create({
    data: {
      title,
      slug: slugify(title),
      excerpt: excerpt || null,
      content,
      image: image || null,
      category: category || null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const published = formData.get("published") === "on";

  await prisma.post.update({
    where: { id },
    data: {
      title,
      excerpt: excerpt || null,
      content,
      image: image || null,
      category: category || null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
