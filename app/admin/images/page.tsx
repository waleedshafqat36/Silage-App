"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLayout from "@/components/Admin/AdminLayout";
import ManageImages from "@/components/Admin/ManageImages";

export default function ImagesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    if ((session.user as { role?: string })?.role !== "admin") {
      router.push("/");
      return;
    }
  }, [session, router]);

  return (
    <AdminLayout>
      <ManageImages />
    </AdminLayout>
  );
}
