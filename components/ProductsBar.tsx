import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { FcElectronics } from "react-icons/fc";
import { GiClothes } from "react-icons/gi";
import { PiOfficeChairFill } from "react-icons/pi";
import { RiFridgeFill } from "react-icons/ri";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlineSubtitles } from "react-icons/md";

import React from "react";

interface Props {
  classname?: String;
}

const ProductsBar:React.FC<Props> = ({classname}) => {
  return (
    <div className={`flex justify-center px-16 py-2 space-x-12 ${classname}`}>
      <Link href="" className="grid justify-items-center">
        <FaShoppingBasket className="text-2xl" />
        <p>Grocery</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <FaMobile className="text-2xl" />
        <p>Mobiles</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <FcElectronics className="text-2xl" />
        <p>Electronics</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <GiClothes className="text-2xl" />
        <p>Fashion</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <PiOfficeChairFill className="text-2xl" />
        <p>Furniture & Home</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <RiFridgeFill className="text-2xl" />
        <p>Appliances</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <GiAirplaneDeparture className="text-2xl" />
        <p>Travel</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <FaBoxOpen className="text-2xl" />
        <p>FMCG & Healthcare</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <MdOutlineSubtitles className="text-2xl" />
        <p>Services & Subscriptions</p>
      </Link>
    </div>
  );
};
// space-x-4 md:space-x-6 lg:space-x-8
export default ProductsBar;
