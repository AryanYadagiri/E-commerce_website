import SalesLineChart from "@/components/SalesLineChart";
import SellerProducts from "@/components/SellerProducts";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SellerDashboard = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <SalesLineChart className="w-4/5 mx-auto"/>
      <SellerProducts className="my-14"/>
    </div>
  );
};

export default SellerDashboard;
