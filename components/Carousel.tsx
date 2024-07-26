import React, { useState } from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { Product, fetchProducts } from "@/app/api/products";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [offset, setOffset] = useState(0);
  const productsPerPage = 3;

  const { data: products, isLoading, isError } = useQuery(
    {
      queryKey: ["products", offset],
      queryFn: async () => {
        const limit = productsPerPage;
        return fetchProducts(limit, offset);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products.</div>;
  }

  const currentProducts = products ? products.slice(0, productsPerPage) : [];

  const handlePrevClick = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1));
    setOffset((prevOffset) => Math.max(0, prevOffset - productsPerPage));
  };


  const handleNextClick = () => {
    if (products && products.length < productsPerPage) {
      return;
    }
    setActiveSlide((prevSlide) => prevSlide + 1);
    setOffset((prevOffset) => prevOffset + productsPerPage);
  };

  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="carousel-item px-[5rem] space-x-4 mx-auto">
          {currentProducts.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button className="btn btn-circle" onClick={handlePrevClick}>
            ❮
          </button>
          <button className="btn btn-circle" onClick={handleNextClick}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;