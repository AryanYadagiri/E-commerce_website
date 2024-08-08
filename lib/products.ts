import axios from "axios";

export interface Product {
  id?: number;
  image?: File;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  imageAlt: string;
  sellerProfileId?: string;
}

export const fetchProducts = async (
  limit: number,
  offset: number,
  productId?: number
) => {
  const url = productId
    ? `/api/products?productId=${productId}`
    : `/api/products?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data;
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  try {
    const { data } = await axios.post("/api/products", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating product:", error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    } else {
      console.error("Error creating product:", error);
    }
    throw error;
  }
};
export const updateProduct = async (product: Product): Promise<Product> => {
  const { data } = await axios.put(`/api/products/${product.id}`, product);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`/api/products/${id}`);
};

export const addToCart = async (
  productId: number,
  userId: string,
  quantity: number
) => {
  try {
    const cartItem = { productId, userId, quantity };
    const { data } = await axios.post("/api/cart", cartItem);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};
