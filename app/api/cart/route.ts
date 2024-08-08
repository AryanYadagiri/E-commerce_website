import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, productId, quantity } = await request.json();
    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
    return NextResponse.json(
      { message: "Cart item created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
};
