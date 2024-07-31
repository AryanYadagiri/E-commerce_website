import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, Product } from "@/lib/products";
import Image from "next/image";

interface ProductFormProps {
  onClose: () => void;
  initialProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const isEditing = Boolean(initialProduct);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: initialProduct || {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      imageAlt: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setValue("imageUrl", imageUrl);
      setValue("imageAlt", file.name);
    }
  };

  const onSubmit = async (data: Product) => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("imageAlt", data.name);

    const product: Product = {
      image: data.image,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      imageAlt: data.imageAlt,
    };

    if (isEditing) {
      await updateProduct(product);
    } else {
      await createProduct(product);
    }

    queryClient.invalidateQueries({ queryKey: ["products"] });
    onClose();
  };

  return (
    <div
      className={`card lg:card-side bg-base-100 shadow-xl ${
        isEditing ? "w-full" : "w-2/4"
      }`}
    >
      <figure>
        <Image src={imageUrl} alt={watch("imageAlt")} />
      </figure>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="card-title">
            {isEditing ? "Update Product" : "Create Product"}
          </h2>
          <div className="form-control">
            <label className="label">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="file-input file-input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="form-control">
            <label className="label">Description</label>
            <input
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              className="input input-bordered"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="form-control">
            <label className="label">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="input input-bordered"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div className="form-control">
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              className="input input-bordered"
            />
            {errors.quantity && <p>{errors.quantity.message}</p>}
          </div>
          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary mt-5">
              {isEditing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-5"
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
