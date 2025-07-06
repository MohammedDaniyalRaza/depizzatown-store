import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
    console.log('Products API: Fetching from admin panel at:', adminUrl);
    
    const response = await fetch(`${adminUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Products API: Admin panel response error:', response.status, response.statusText);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const products = await response.json();
    console.log('Products API: Successfully fetched', products.length, 'products');
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 