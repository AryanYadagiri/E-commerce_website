"use client"
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct, Product } from "@/app/api/products";
import ProductCard from "./ProductCard";

const SellerProducts: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation<void, unknown, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={() => {}}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerProducts;
