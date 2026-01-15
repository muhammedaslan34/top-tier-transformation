import { NextRequest, NextResponse } from "next/server";
import { getSessionToken, verifySession } from "@/lib/auth";

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const sessionToken = request.cookies.get("admin_session")?.value;
  
  const isValid = await verifySession(sessionToken);
  
  if (!isValid) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  return null; // Auth passed
}
