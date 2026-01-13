"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Cookies() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to privacy page with cookies tab
    router.replace("/privacy?tab=cookies");
  }, [router]);

  return null;
}
