
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import ProductGrid from "@/components/Products/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MMPDPage: React.FC = () => {
  const mmpdProducts = getProductsByCategory("mmpd");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  
  const filteredProducts = mmpdProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">MMPD Collection</h1>
        <p className="text-[#5fa9af] mb-6">Apparel collection in collaboration with MMPD.</p>
        
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
      
      <ProductGrid products={currentProducts} />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default MMPDPage;
