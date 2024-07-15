import SalesLineChart from "@/components/SalesLineChart";
import SellerProducts from "@/components/SellerProducts";
import React from "react";

const SellerDashboard = () => {
  return (
    <div>
      <SalesLineChart />
      <SellerProducts />
    </div>
  );
};

export default SellerDashboard;
