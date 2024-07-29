import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: String } }
) {
  const { id } = params;
  const { name, description, price, quantity } = await request.json();
  try {
    await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, quantity },
    });
    return NextResponse.json({ status: 201 });
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: String } }
) {
  const { id } = params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ status: 201 });
  } catch (error) {
    NextResponse.json({ status: 500 });
  }
}
