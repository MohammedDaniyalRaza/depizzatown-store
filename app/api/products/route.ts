import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const products = await response.json();
    return Response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 