import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, type SessionUser } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";

export default async function AdminLayoutProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("auth-token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const user = await verifyToken(token);

  if (!user) {
    redirect("/admin/login");
  }

  const sessionUser: SessionUser = {
    userId: user.userId,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return <AdminShell user={sessionUser}>{children}</AdminShell>;
}
