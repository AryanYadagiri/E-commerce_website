import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, number, email, password, businessName, businessAddress } = await req.json();

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the new user and seller profile
    await prisma.user.create({
      data: {
        name,
        number,
        email,
        password: hashedPassword,
        role: 'SELLER',
        sellerProfile: {
          create: {
            businessName,
            businessAddress,
          },
        },
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Internal Server Error', error: message }, { status: 500 });
  }
}
