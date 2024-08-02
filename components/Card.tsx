import React from "react";
import Link from "next/link";
import { Product } from "@/lib/products";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={product.imageUrl} alt={product.imageAlt} className="h-48"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <div className="card-actions justify-end">
          <Link href={`/product-page/${product.id}`}>
            {" "}
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
