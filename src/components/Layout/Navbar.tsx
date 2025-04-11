
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";

const Navbar: React.FC = () => {
  const { cartItemsCount } = useStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "font-bold border-b-2 border-culturing-DEFAULT" : "";
  };

  return (
    <header className="bg-white py-4 px-4 md:px-6 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            theculturing.shop
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className={`text-sm uppercase tracking-wider hover:text-culturing-red ${isActive("/")}`}>
            In-House
          </Link>
          <Link to="/mmpd" className={`text-sm uppercase tracking-wider hover:text-culturing-red ${isActive("/mmpd")}`}>
            MMPD
          </Link>
          <Link to="/artist-merch" className={`text-sm uppercase tracking-wider hover:text-culturing-red ${isActive("/artist-merch")}`}>
            Artist Merch
          </Link>
          <Link to="/contact" className={`text-sm uppercase tracking-wider hover:text-culturing-red ${isActive("/contact")}`}>
            Contact
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-culturing-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
