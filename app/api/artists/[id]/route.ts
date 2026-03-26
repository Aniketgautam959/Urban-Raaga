import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = { params: { id: string } };

// GET /api/artists/:id
export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const artist = await Artist.findById(params.id).lean();
  if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ artist });
}

// PUT /api/artists/:id — Clerk protected
export async function PUT(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  try {
    const artist = await Artist.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).lean();
    if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ artist });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "An artist with this name/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to update artist" }, { status: 400 });
  }
}

// DELETE /api/artists/:id — Clerk protected
export async function DELETE(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Artist.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Artist deleted successfully" });
}
