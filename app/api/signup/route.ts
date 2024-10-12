import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, password, crm, crmState, subspecialty, experience, volumePerDay, aiExperience } = await req.json();

    // Check if user already exists
    const existingUsers = await query({
      query: 'SELECT * FROM users WHERE email = ?',
      values: [email],
    }) as any[];

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Insert user into database
    const result = await query({
      query: `INSERT INTO users (name, email, password, crm, crm_state, subspecialty, experience, volume_per_day, ai_experience)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [name, email, hashedPassword, crm, crmState, subspecialty, experience, volumePerDay, aiExperience],
    }) as any;

    return NextResponse.json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 });
  }
}