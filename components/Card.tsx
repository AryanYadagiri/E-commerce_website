import React from 'react'
import { Product } from '@/app/api/products'

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({product}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={product.imageUrl} alt={product.imageAlt} /></figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default Card