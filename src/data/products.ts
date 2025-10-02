import { Product } from "../contexts/StoreContext";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("https://api.suavemusicpr.com/api/v1/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    const categoryMap: Record<string, "inhouse" | "mmpd" | "artist" | "literary"> = {
      IN_HOUSE: "inhouse",
      MMPD: "mmpd",
      ARTIST_MERCH: "artist",
      LITERARY: "literary",
    };

    return data.map((item: any) => ({...item, category: categoryMap[item.category] || "inhouse" }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsByCategory = async (
  category: "inhouse" | "mmpd" | "artist" | "literary"
): Promise<Product[]> => {
  const products = await fetchProducts();
  return products.filter((product) => product.category === category);
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await fetchProducts();
  return products.find((product) => product.id === id);
};