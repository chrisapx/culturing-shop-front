
import React, { useState } from "react";
import { Product, useStore } from "@/contexts/StoreContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = [
  { name: "Black", value: "#1A1F2C" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#0EA5E9" },
  { name: "Purple", value: "#8B5CF6" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart } = useStore();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor: selectedColor.name,
      selectedSize,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">
                High-quality product from {product.category === "inhouse" 
                  ? "The Culturing" 
                  : product.category === "mmpd" 
                    ? "MMPD Collection" 
                    : "Featured Artists"}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Color</h4>
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor.name === color.name
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 flex items-center justify-center border ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button
                className="w-full py-6"
                onClick={handleAddToCart}
              >
                Add to Cart - ${product.price.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
