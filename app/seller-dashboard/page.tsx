import SalesLineChart from "@/components/SalesLineChart";
import SellerProducts from "@/components/SellerProducts";
import React from "react";

const SellerDashboard = () => {
  return (
    <div>
      <SalesLineChart className="w-4/5 mx-auto"/>
      <SellerProducts className="my-14 mx-3"/>
    </div>
  );
};

export default SellerDashboard;
