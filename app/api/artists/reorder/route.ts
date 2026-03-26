import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  
  try {
    const { items } = await req.json(); // Expected format: [{ id: "...", order: 0 }, { id: "...", order: 1 }]

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload format. Expected array of items." }, { status: 400 });
    }

    // Perform bulk update
    const bulkOps = items.map((item: { id: string, order: number }) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } }
      }
    }));

    if (bulkOps.length > 0) {
      await Artist.bulkWrite(bulkOps);
    }

    return NextResponse.json({ success: true, message: "Order updated successfully" });
  } catch (error: any) {
    console.error("Reorder error:", error);
    return NextResponse.json({ error: error.message || "Failed to update order" }, { status: 500 });
  }
}
