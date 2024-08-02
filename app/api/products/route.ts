import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  if (productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { error: "Failed to fetch product" },
        { status: 500 }
      );
    }
  } else {
    const limit = parseInt(url.searchParams.get("limit") ?? "") || 3;
    const offset = parseInt(url.searchParams.get("offset") ?? "") || 0;
    try {
      const products = await prisma.product.findMany({
        take: limit,
        skip: offset,
      });
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const sellerProfileId = session?.user.sellerProfileId ?? "";
  if (!sellerProfileId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();
 
  const image = formData.get("image") as File | null;
  if (!image) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const fileBuffer = await image.arrayBuffer();

  var mime = image.type;
  var encoding = "base64";
  var base64Data = Buffer.from(fileBuffer).toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const uploadToCloudinary = async () => {
      try {
        const result = await cloudinary.uploader.upload(fileUri, {
          invalidate: true,
          folder: "uploads",
        });
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    const result = await uploadToCloudinary();
    let imageUrl: string = (result as { secure_url: string }).secure_url;

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const imageAlt = formData.get("imageAlt") as string;
    if (
      !name ||
      !description ||
      price === undefined ||
      quantity === undefined ||
      !imageAlt
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price: price,
        quantity: quantity,
        imageAlt,
        imageUrl,
        sellerProfileId: sellerProfileId,
      },
    });
    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
}
