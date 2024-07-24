import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const sellerProfileId = session?.user.sellerProfileId ?? "";
  const { name, description, price, quantity, imageUrl, imageAlt } =
    await request.json();
  if (
    !name ||
    !description ||
    price === undefined ||
    quantity === undefined ||
    !imageUrl ||
    !imageAlt ||
    !sellerProfileId
  ) {
    console.log(name, description, price, quantity, imageUrl, imageAlt, sellerProfileId);
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  console.log(name, description, price, quantity, sellerProfileId);
  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        imageUrl,
        imageAlt,
        sellerProfileId: sellerProfileId,
      },
    });

    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
