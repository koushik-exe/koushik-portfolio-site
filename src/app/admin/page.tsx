import { requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  await requireAdmin();
  redirect("/admin/projects");
}
