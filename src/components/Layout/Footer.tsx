
import React from "react";
import { Instagram, Twitter, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-culturing-DEFAULT text-white py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a 
              href="https://theculturing.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-culturing-red transition-colors"
            >
              Visit The Culturing Main Site
            </a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://twitter.com/theculturing_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-culturing-red transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/theculturingea" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-culturing-red transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="tel:+256761334247" 
              className="text-white hover:text-culturing-red transition-colors"
              aria-label="Phone"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-culturing-gray">
          <p>&copy; {new Date().getFullYear()} theculturing.shop - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
