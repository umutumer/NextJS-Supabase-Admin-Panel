import { createClient } from "./client";
import { Product } from "@/interfaces/Product";

const supabase = createClient();

// READ: All products
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data as Product[];
}

// READ: Single product
export async function getProductById(id: number): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Product;
}

// UPDATE
export async function updateProduct(
  id: number,
  updates: Partial<
    Pick<Product, "product_name" | "product_description" | "product_price">
  >
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
}

// CREATE
export async function createProduct(
  product: Omit<Product, "id" | "created_at">
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();
  if (error) {
    console.error("Error creating product:", error.message, error.details);
    throw error;
  }
  return data as Product;
}

// DELETE
export async function deleteProduct(id: number): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
}
