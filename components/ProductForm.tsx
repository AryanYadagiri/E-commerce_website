import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, Product } from "@/app/api/products";

interface ProductFormProps {
  initialProduct?: Product;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onClose,
}) => {
  const [product, setProduct] = useState<Product>({
    id: initialProduct?.id || 0,
    name: initialProduct?.name || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || 0,
    quantity: initialProduct?.quantity || 0,
  });

  const queryClient = useQueryClient();
  const isEditing = Boolean(initialProduct);

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateMutation.mutate(product);
    } else {
      createMutation.mutate(product);
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Product"
        />
      </figure>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h2 className="card-title">
            {isEditing ? "Update Product" : "Create Product"}
          </h2>
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <input
              type="text"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Price</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) })
              }
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Quantity</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                setProduct({
                  ...product,
                  quantity: parseInt(e.target.value, 10),
                })
              }
              className="input input-bordered"
              required
            />
          </div>
          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
