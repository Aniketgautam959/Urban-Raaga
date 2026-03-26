import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  // Compare credentials
  const emailMatch = email === adminEmail;
  // Support both plain text (env var) and hashed passwords
  const passwordMatch = adminPassword
    ? password === adminPassword || (await bcrypt.compare(password, adminPassword))
    : false;

  if (!emailMatch || !passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signToken({ email, role: "admin" });

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return response;
}
