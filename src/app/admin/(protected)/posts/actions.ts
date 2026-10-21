"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUniqueSlug } from "@/lib/slug-utils";

export async function togglePostPublish(id: string) {
  try {
    const p = await prisma.post.findUnique({ where: { id } });
    if (!p) return;
    await prisma.post.update({
      where: { id },
      data: {
        published: !p.published,
        publishedAt: !p.published ? new Date() : p.publishedAt,
      },
    });
    revalidatePath("/");
    revalidatePath("/tin-tuc");
    revalidatePath("/admin/posts");
  } catch (error) {
    console.error("Error toggling post publish:", error);
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/tin-tuc");
    revalidatePath("/admin/posts");
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

export async function createPost(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim() || "";
  const image = (formData.get("image") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const published = formData.get("published") === "on";

  if (!title) {
    throw new Error("Tiêu đề bài viết không được để trống");
  }

  const slug = await getUniqueSlug("post", title);

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      image: image || null,
      category: category || null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim() || "";
  const image = (formData.get("image") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const published = formData.get("published") === "on";

  if (!title) {
    throw new Error("Tiêu đề bài viết không được để trống");
  }

  const slug = await getUniqueSlug("post", title, id);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      image: image || null,
      category: category || null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
