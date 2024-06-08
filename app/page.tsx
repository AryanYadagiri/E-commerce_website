import Carousel from "@/components/Carousel";
import ProductsBar from "@/components/ProductsBar";

export default function Home() {
  return (
    <>
      <ProductsBar/>
      <div className="mb-5">
        <h1 className="text-4xl ml-[4.5rem] my-5">Great deals on discount</h1>
        <Carousel />
        <h1 className="text-4xl ml-[4.5rem] my-5">New products</h1>
        <Carousel />
        <h1 className="text-4xl ml-[4.5rem] my-5">
          Subscriptions and services
        </h1>
        <Carousel />
      </div>
    </>
  );
}

// 27rem
