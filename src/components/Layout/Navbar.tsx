
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthUser, isAuthenticated, logout } from "@/lib/AuthCookieManager";

const Navbar: React.FC = () => {
  const { cartItemsCount } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  const isActive = (path: string) => {
    return location.pathname === path ? "font-bold border-b-2 border-black" : "";
  };

  return (
    <header className="bg-[#5fa9af] text-white py-4 px-4 md:px-6 border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex w-full md:w-auto justify-between items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            <div className="flex items-center">
              <img src="/logos/Artboard-5@2x-8.png" alt="The Culturing Logo" className="h-9"/>
              <span className="backdrop-xl">.store</span>
            </div>
          </Link>
          
          {isMobile && (
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label="Toggle menu" className="focus:outline-none">
                    <Menu className="h-6 w-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/" className={`w-full ${isActive("/")}`}>
                      MMPD
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/in-house" className={`w-full ${isActive("/in-house")}`}>
                      In-House
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/artist-merch" className={`w-full ${isActive("/artist-merch")}`}>
                      Artist Merch
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact" className={`w-full ${isActive("/contact")}`}>
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className={`w-full ${isActive("/orders")}`}>
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button onClick={handleLogout} className={`w-full`}>
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {!isMobile && (
          <nav className="flex items-center space-x-6">
            <Link to="/" className={`text-sm uppercase tracking-wider hover:text-accent ${isActive("/")}`}>
              MMPD
            </Link>
            <Link to="/in-house" className={`text-sm uppercase tracking-wider hover:text-accent ${isActive("/in-house")}`}>
              In-House
            </Link>
            <Link to="/artist-merch" className={`text-sm uppercase tracking-wider hover:text-accent ${isActive("/artist-merch")}`}>
              Artist Merch
            </Link>
            <Link to="/contact" className={`text-sm uppercase tracking-wider hover:text-accent ${isActive("/contact")}`}>
              Contact
            </Link>
            <Link to="/orders" className={`text-sm tracking-wider hover:text-accent ${isActive("/orders")}`}>
              Orders
            </Link>
            <button onClick={handleLogout} className={`text-sm tracking-wider hover:text-accent`}>
              { getAuthUser()?.userId ? "Logout" : "Login" }
            </button>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
