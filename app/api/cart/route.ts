import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id ?? "";

  try {
    const { productId, quantity } = await request.json();
    const productIdNum = parseInt(productId, 10);
    const quantityNum = parseInt(quantity, 10);

    if (isNaN(productIdNum) || isNaN(quantityNum)) {
      return NextResponse.json(
        { error: "Invalid product ID or quantity" },

        { status: 400 }
      );
    }
    // console.log(userId, productId, quantity);
    await prisma.cartItem.create({
      data: {
        userId,
        productId: productIdNum,
        quantity: quantityNum,
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

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log(userId);
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });
    // console.log(cartItems);
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
};
