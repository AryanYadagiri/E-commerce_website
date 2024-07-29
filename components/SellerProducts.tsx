"use client"
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct, createProduct, Product } from "@/app/api/products";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

interface ClassNameProps {
  className?: string;
}

const SellerProducts: React.FC<ClassNameProps> = ({className}) => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(3, 0),
  });

  const deleteMutation = useMutation<void, unknown, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const createMutation = useMutation<Product, unknown, Omit<Product, "id">>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleCreate = (product: Omit<Product, "id">) => {
    createMutation.mutate(product);
    setIsCreating(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className={`container mx-auto ${className}`}>
      <button className="btn btn-primary mb-10" onClick={() => setIsCreating(true)}>
        Create New Product
      </button>
      {isCreating ? (
        <ProductForm onClose={() => setIsCreating(false)} initialProduct={undefined} onSubmit={handleCreate} />
      ) : (
        <div className="flex flex-col w-2/5 space-y-5">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdate={() => {}}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;