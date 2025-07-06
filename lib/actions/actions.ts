const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client side - use relative URL
    return '';
  }
  // Server side - use full URL
  return process.env.NEXT_PUBLIC_STORE_URL || 'http://localhost:3001';
};

export const getCollections = async () => {
  try {
    const baseUrl = getBaseUrl();
    const collections = await fetch(`${baseUrl}/api/collections`)
    if (!collections.ok) {
      throw new Error(`Failed to fetch collections: ${collections.status}`);
    }
    return collections.json();
  } catch (error) {
    console.error('Error loading collections:', error);
    return [];
  }
};

export const getProduct = async () => {
  try {
    const baseUrl = getBaseUrl();
    const products = await fetch(`${baseUrl}/api/products`)
    if (!products.ok) {
      throw new Error(`Failed to fetch products: ${products.status}`);
    }
    return products.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const baseUrl = getBaseUrl();
    const product = await fetch(`${baseUrl}/api/products/${productId}`)
    if (!product.ok) {
      throw new Error(`Failed to fetch product: ${product.status}`);
    }
    return product.json();
  } catch (error) {
    console.error('Error loading product details:', error);
    return null;
  }
};