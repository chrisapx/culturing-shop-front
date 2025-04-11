
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import ProductGrid from "@/components/Products/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MMPDPage: React.FC = () => {
  const mmpdProducts = getProductsByCategory("mmpd");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProducts = mmpdProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">MMPD Collection</h1>
        <p className="text-gray-600 mb-6">Apparel collection in collaboration with MMPD.</p>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ProductGrid products={filteredProducts} />
    </Layout>
  );
};

export default MMPDPage;
