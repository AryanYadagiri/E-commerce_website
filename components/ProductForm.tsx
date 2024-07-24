import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, Product } from "@/app/api/products";
import { useSession } from "next-auth/react";
import axios from "axios";

interface ProductFormProps {
  onClose: () => void;
  initialProduct?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onClose }) => {
  const queryClient = useQueryClient();
  const session = useSession()
  const isEditing = Boolean(initialProduct);
  const sellerProfileId = session.status === 'authenticated' ? session.data.user.sellerProfileId : undefined;
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Product>({
    defaultValues: initialProduct || {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      imageUrl: "",
      imageAlt: "",
      sellerProfileId: sellerProfileId
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: Product) => createProduct({ ...data, sellerProfileId: sellerProfileId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Product) => updateProduct({ ...data, sellerProfileId: sellerProfileId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  // const onSubmit = (data: Product) => {
  //   if (isEditing) {
  //     updateMutation.mutate(data);
  //   } else {
  //     createMutation.mutate(data);
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setValue("imageUrl", imageUrl);
      setValue("imageAlt", file.name);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "your-upload-preset");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      setValue("imageUrl", imageUrl);
      setUploading(false);
    }
  };


  const onSubmit = async (data: Product) => {
    await handleImageUpload();
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const imageUrl = watch("imageUrl");

  return (
    <div className={`card lg:card-side bg-base-100 shadow-xl ${isEditing ? 'w-full' : 'w-2/4'}`}>
      <div>{JSON.stringify(session.data?.user.sellerProfileId)}</div>
      <figure>
        <img
          src={imageUrl}
          alt={watch("imageAlt")}
        />
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
              {...register("description", { required: "Description is required" })}
              className="input input-bordered"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div className="form-control">
            <label className="label">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required", valueAsNumber: true })}
              className="input input-bordered"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div className="form-control">
            <label className="label">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
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