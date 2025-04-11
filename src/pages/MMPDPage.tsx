
import React from "react";
import Layout from "@/components/Layout/Layout";
import ProductGrid from "@/components/Products/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const MMPDPage: React.FC = () => {
  const mmpdProducts = getProductsByCategory("mmpd");
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">MMPD Collection</h1>
        <p className="text-culturing-gray">Apparel collection in collaboration with MMPD.</p>
      </div>
      
      <ProductGrid products={mmpdProducts} />
    </Layout>
  );
};

export default MMPDPage;
