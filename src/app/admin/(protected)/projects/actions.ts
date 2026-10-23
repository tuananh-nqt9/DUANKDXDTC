"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUniqueSlug } from "@/lib/slug-utils";

function revalidateProjectPages(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/du-an");
    if (slug) {
      revalidatePath(`/du-an/${slug}`);
    }
    revalidatePath("/du-an/[slug]", "page");
    revalidatePath("/admin/projects");
    revalidatePath("/", "layout");
  } catch (error) {
    console.warn("Revalidation warning in projects:", error);
  }
}

export async function toggleProjectPublish(id: string) {
  try {
    const p = await prisma.project.findUnique({ where: { id } });
    if (!p) return;
    await prisma.project.update({ where: { id }, data: { published: !p.published } });
    revalidateProjectPages(p.slug);
  } catch (error) {
    console.error("Error toggling project publish:", error);
  }
}

export async function deleteProject(id: string) {
  try {
    const p = await prisma.project.findUnique({ where: { id } });
    await prisma.project.delete({ where: { id } });
    revalidateProjectPages(p?.slug);
  } catch (error) {
    console.error("Error deleting project:", error);
  }
}

export async function createProject(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const client = (formData.get("client") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const yearStr = formData.get("year") as string;
  const category = (formData.get("category") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const image = (formData.get("image") as string)?.trim();
  const orderStr = formData.get("order") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title) {
    throw new Error("Tên dự án không được để trống");
  }

  const slug = await getUniqueSlug("project", title);

  let order = orderStr ? parseInt(orderStr, 10) : 0;
  if (isNaN(order)) order = 0;

  // Nếu không chỉ định order cụ thể, tự gán order tiếp theo
  if (!orderStr) {
    const last = await prisma.project.findFirst({
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }

  await prisma.project.create({
    data: {
      title,
      slug,
      client: client || null,
      location: location || null,
      year: yearStr ? parseInt(yearStr, 10) : null,
      category: category || null,
      excerpt: excerpt || null,
      content: content || null,
      image: image || null,
      order,
      featured,
      published,
    },
  });

  revalidateProjectPages(slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const client = (formData.get("client") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const yearStr = formData.get("year") as string;
  const category = (formData.get("category") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const image = (formData.get("image") as string)?.trim();
  const orderStr = formData.get("order") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!title) {
    throw new Error("Tên dự án không được để trống");
  }

  const slug = await getUniqueSlug("project", title, id);
  let order = orderStr ? parseInt(orderStr, 10) : 0;
  if (isNaN(order)) order = 0;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      client: client || null,
      location: location || null,
      year: yearStr ? parseInt(yearStr, 10) : null,
      category: category || null,
      excerpt: excerpt || null,
      content: content || null,
      image: image || null,
      order,
      featured,
      published,
    },
  });

  revalidateProjectPages(slug);
  redirect("/admin/projects");
}
