"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const PUBLIC_APP_ROUTES = ["/settings"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, authLoading } = useAppSelector((s) => s.user);

  const isPublicRoute = PUBLIC_APP_ROUTES.includes(pathname);

  useEffect(() => {
    if (!authLoading && !isLoggedIn && !isPublicRoute) {
      router.replace("/");
    }
  }, [isLoggedIn, authLoading, router, isPublicRoute]);

  if (authLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ color: "#6b757b", fontSize: "16px" }}>Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn && !isPublicRoute) return null;

  return <>{children}</>;
}
