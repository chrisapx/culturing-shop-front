
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import ProductGrid from "@/components/Products/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const InHousePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const handleFetch = async () => {
      const ps = await getProductsByCategory("inhouse");
      setProducts(ps);
    }

    handleFetch();
  }, []);
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">In-House Collection</h1>
        <p className="text-[#5fa9af]">Explore our signature products crafted by The Culturing.</p>
      </div>
      
      <ProductGrid products={products} />
    </Layout>
  );
};

export default InHousePage;
