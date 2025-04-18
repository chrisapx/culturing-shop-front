
import React from "react";
import Layout from "@/components/Layout/Layout";
import ProductGrid from "@/components/Products/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const InHousePage: React.FC = () => {
  const inHouseProducts = getProductsByCategory("inhouse");
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">In-House Collection</h1>
        <p className="text-culturing-gray">Explore our signature products crafted by The Culturing.</p>
      </div>
      
      <ProductGrid products={inHouseProducts} />
    </Layout>
  );
};

export default InHousePage;
