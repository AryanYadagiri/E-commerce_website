import React from "react";
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

const Shopping = () => {
  return (
    <div className="flex px-16 py-2 space-x-11">
      <Link href="" className="grid justify-items-center">
        <FaShoppingBasket />
        <p>Grocery</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <FaMobile />
        <p>Mobiles</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <FcElectronics />
        <p>Electronics</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <GiClothes />
        <p>Fashion</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <PiOfficeChairFill />
        <p>Furniture & Home</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <RiFridgeFill />
        <p>Appliances</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <GiAirplaneDeparture />
        <p>Travel</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <FaBoxOpen />
        <p>FMCG & Healthcare</p>
      </Link>
      <Link href="" className="grid justify-items-center">
        <MdOutlineSubtitles />
        <p>Services & Subscriptions</p>
      </Link>
    </div>
  );
};

export default Shopping;
