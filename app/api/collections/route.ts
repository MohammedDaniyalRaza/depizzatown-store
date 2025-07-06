import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
    const response = await fetch(`${adminUrl}/api/collections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status}`);
    }

    const collections = await response.json();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
} 