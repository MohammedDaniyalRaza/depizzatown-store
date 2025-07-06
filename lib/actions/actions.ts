export const getCollections = async () => {
  try {
    const collections = await fetch(`http://localhost:3001/api/collections`)
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
    const products = await fetch(`http://localhost:3001/api/products`)
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
    const product = await fetch(`http://localhost:3001/api/products/${productId}`)
    if (!product.ok) {
      throw new Error(`Failed to fetch product: ${product.status}`);
    }
    return product.json();
  } catch (error) {
    console.error('Error loading product details:', error);
    return null;
  }
};