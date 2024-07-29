import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  imageAlt: string;
  sellerProfileId?: string;
}

export const fetchProducts = async (limit: number, offset: number, productId?: number) => {
  const url = productId
    ? `/api/products?productId=${productId}`
    : `/api/products?limit=${limit}&offset=${offset}`;
  const response = await axios.get(url);
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const { data } = await axios.post("/api/products", product);
  return data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const { data } = await axios.put(`/api/products/${product.id}`, product);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`/api/products/${id}`);
};
