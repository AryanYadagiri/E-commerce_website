import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, number, email, password } = await req.json();

    // Check if the required fields are provided
    if (!name || !number || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Convert number to integer
    const phoneNumber = parseInt(number, 10); // Assuming 'number' is a string

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await prisma.user.create({
      data: {
        name,
        number: phoneNumber, // Assign the parsed integer
        email,
        password: hashedPassword,
        role: 'REGULAR',
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating user:', error);

    // Handle different types of errors
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Internal Server Error', error: message }, { status: 500 });
  }
}
