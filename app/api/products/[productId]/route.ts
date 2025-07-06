import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const product = await response.json();
    return Response.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return Response.json({ error: 'Failed to fetch product details' }, { status: 500 });
  }
} 