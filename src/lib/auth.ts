import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "change-me-in-production";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionData {
  authenticated: boolean;
  expiresAt: number;
}

export async function createSession(): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const sessionData: SessionData = {
    authenticated: true,
    expiresAt,
  };
  
  // In production, you'd want to sign this with a secret
  // For simplicity, we'll use a simple encoding
  const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64");
  return sessionToken;
}

export async function verifySession(sessionToken: string | undefined): Promise<boolean> {
  if (!sessionToken) return false;
  
  try {
    const sessionData: SessionData = JSON.parse(
      Buffer.from(sessionToken, "base64").toString()
    );
    
    if (!sessionData.authenticated) return false;
    if (Date.now() > sessionData.expiresAt) return false;
    
    return true;
  } catch {
    return false;
  }
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function setSessionCookie(sessionToken: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}
