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
    console.log('Fetching collections from:', `${baseUrl}/api/collections`);
    
    const collections = await fetch(`${baseUrl}/api/collections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!collections.ok) {
      console.error('Collections API error:', collections.status, collections.statusText);
      throw new Error(`Failed to fetch collections: ${collections.status}`);
    }
    
    const data = await collections.json();
    console.log('Collections fetched successfully:', data.length, 'collections');
    return data;
  } catch (error) {
    console.error('Error loading collections:', error);
    return [];
  }
};

export const getProduct = async () => {
  try {
    const baseUrl = getBaseUrl();
    console.log('Fetching products from:', `${baseUrl}/api/products`);
    
    const products = await fetch(`${baseUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!products.ok) {
      console.error('Products API error:', products.status, products.statusText);
      throw new Error(`Failed to fetch products: ${products.status}`);
    }
    
    const data = await products.json();
    console.log('Products fetched successfully:', data.length, 'products');
    return data;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

export const getProductDetails = async (productId: string) => {
  try {
    const baseUrl = getBaseUrl();
    console.log('Fetching product details from:', `${baseUrl}/api/products/${productId}`);
    
    const product = await fetch(`${baseUrl}/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!product.ok) {
      console.error('Product details API error:', product.status, product.statusText);
      throw new Error(`Failed to fetch product: ${product.status}`);
    }
    
    const data = await product.json();
    console.log('Product details fetched successfully');
    return data;
  } catch (error) {
    console.error('Error loading product details:', error);
    return null;
  }
};