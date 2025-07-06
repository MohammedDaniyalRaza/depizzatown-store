import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('http://localhost:3000/api/collections', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status}`);
    }

    const collections = await response.json();
    return Response.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return Response.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
} 