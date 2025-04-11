
import { Product } from "../contexts/StoreContext";

// Product data
export const products: Product[] = [
  // In-House Products
  {
    id: "inhouse-1",
    name: "Classic Logo Tee",
    price: 25.00,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1660997351262-6c31d8a35b6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsYXNzaWMlMjBsb2dvJTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1739001411231-4fc0f4140259?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsYXNzaWMlMjBsb2dvJTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww"
    ],
    category: "inhouse"
  },
  {
    id: "inhouse-2",
    name: "The Culturing Cap",
    price: 22.00,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2676&auto=format&fit=crop",
    ],
    category: "inhouse"
  },
  {
    id: "inhouse-3",
    name: "Urban Hoodie",
    price: 45.00,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "inhouse"
  },
  {
    id: "inhouse-4",
    name: "Monochrome Tote Bag",
    price: 18.00,
    images: [
      "https://images.unsplash.com/photo-1574365569389-a10d488ca3fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG90ZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    category: "inhouse"
  },
  {
    id: "inhouse-5",
    name: "Minimal Socks Pack",
    price: 12.00,
    images: [
      "https://images.unsplash.com/photo-1641482847237-e64ca2769a8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1pbmltYWwlMjBzb2Nrc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    category: "inhouse"
  },
  {
    id: "inhouse-6",
    name: "Culture Statement Beanie",
    price: 20.00,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "inhouse"
  },

  // MMPD Products
  {
    id: "mmpd-1",
    name: "MMPD Graphic Tee",
    price: 28.00,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "mmpd"
  },
  {
    id: "mmpd-2",
    name: "MMPD Bomber Jacket",
    price: 75.00,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2736&auto=format&fit=crop",
    ],
    category: "mmpd"
  },
  {
    id: "mmpd-3",
    name: "MMPD Cargo Pants",
    price: 60.00,
    images: [
      "https://images.unsplash.com/photo-1604176424472-9d9898884a4a?q=80&w=2779&auto=format&fit=crop",
    ],
    category: "mmpd"
  },
  {
    id: "mmpd-4",
    name: "MMPD Oversized Sweater",
    price: 55.00,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2705&auto=format&fit=crop",
    ],
    category: "mmpd"
  },
  {
    id: "mmpd-5",
    name: "MMPD Structured Cap",
    price: 32.00,
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=2670&auto=format&fit=crop",
    ],
    category: "mmpd"
  },
  {
    id: "mmpd-6",
    name: "MMPD Statement Scarf",
    price: 38.00,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2574&auto=format&fit=crop",
    ],
    category: "mmpd"
  },

  // Artist Merch Products
  {
    id: "artist-1",
    name: "Limited Edition Print",
    price: 40.00,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2745&auto=format&fit=crop",
    ],
    category: "artist"
  },
  {
    id: "artist-2",
    name: "Artist Collab Tee",
    price: 35.00,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2670&auto=format&fit=crop",
    ],
    category: "artist"
  },
  {
    id: "artist-3",
    name: "Graphic Poster Set",
    price: 30.00,
    images: [
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2669&auto=format&fit=crop",
    ],
    category: "artist"
  },
  {
    id: "artist-4",
    name: "Artist Edition Hoodie",
    price: 65.00,
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "artist"
  },
  {
    id: "artist-5",
    name: "Embroidered Cap",
    price: 30.00,
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2670&auto=format&fit=crop",
    ],
    category: "artist"
  },
  {
    id: "artist-6",
    name: "Artist Series Pins",
    price: 15.00,
    images: [
      "https://images.unsplash.com/photo-1563290364-aa4c55f652b1?q=80&w=2787&auto=format&fit=crop",
    ],
    category: "artist"
  }
];

export const getProductsByCategory = (category: "inhouse" | "mmpd" | "artist") => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};
