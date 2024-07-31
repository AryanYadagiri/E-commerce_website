"use client"
import React, { useState } from "react";
import { Product } from "@/lib/products";
import ProductForm from "./ProductForm";

interface ProductCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (product.id !== undefined) {
      onDelete(product.id);
    }
  };

  const handleSubmit = (updatedProduct: Omit<Product, "id">) => {
    const productWithId: Product = {...updatedProduct, id: product.id };
    onUpdate(productWithId);
    setIsEditing(false);
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      {isEditing ? (
        <ProductForm initialProduct={product} onClose={handleCloseForm} onSubmit={handleSubmit} />
      ) : (
        <>
          <figure>
            <img src={product.imageUrl} alt={product.imageAlt} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={ handleDeleteClick}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
