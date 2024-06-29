import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { name, description, price, quantity } = await request.json();
  if (!name || !description || price === undefined || quantity === undefined) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        quantity: parseInt(quantity),
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
}
