import { prisma } from "./prisma";
import { slugify } from "./utils";

export async function getUniqueSlug(
  model: "service" | "project" | "post" | "equipment" | "testCategory",
  title: string,
  excludeId?: string
): Promise<string> {
  let baseSlug = slugify(title).trim();
  if (!baseSlug) {
    baseSlug = `${model}-${Date.now()}`;
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let exists = false;

    if (model === "service") {
      const found = await prisma.service.findFirst({
        where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
        select: { id: true },
      });
      exists = Boolean(found);
    } else if (model === "project") {
      const found = await prisma.project.findFirst({
        where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
        select: { id: true },
      });
      exists = Boolean(found);
    } else if (model === "post") {
      const found = await prisma.post.findFirst({
        where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
        select: { id: true },
      });
      exists = Boolean(found);
    } else if (model === "equipment") {
      const found = await prisma.equipment.findFirst({
        where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
        select: { id: true },
      });
      exists = Boolean(found);
    } else if (model === "testCategory") {
      const found = await prisma.testCategory.findFirst({
        where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
        select: { id: true },
      });
      exists = Boolean(found);
    }

    if (!exists) {
      return slug;
    }

    slug = `${baseSlug}-${counter++}`;
  }
}
