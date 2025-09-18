
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import ProductGrid from "@/components/Products/ProductGrid";
import { getProductsByCategory } from "@/data/products";

const ArtistMerchPage: React.FC = () => {
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    const handleFetch = async () => {
      const ps = await getProductsByCategory("artist");
      setProducts(ps);
    }

    handleFetch();
  }, []);
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Artist Merch</h1>
        <p className="text-[#5fa9af]">Limited edition merchandise from our featured artists.</p>
      </div>
      <ProductGrid products={products} />
      { products.length < 1 && <div>Artist Merch dropping soon...</div>}
    </Layout>
  );
};

export default ArtistMerchPage;
