"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Privacy from "../privacy/page";

export default function Terms() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to privacy page with terms tab
    router.replace("/privacy?tab=terms");
  }, [router]);

  return null;
}
