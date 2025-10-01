import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Product } from "@/interfaces/Product";
import { createProduct, updateProduct } from '@/lib/supabase/Products';
interface ProductFormProps {
  formData: Omit<Product, "created_at">
  setFormData: React.Dispatch<React.SetStateAction<Omit<Product, "created_at">>>
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, setFormData }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.id) {
            updateProduct(formData.id, {
                product_name: formData.product_name,
                product_description: formData.product_description,
                product_price: formData.product_price
            })
        } else {
            createProduct(formData)
        }
    };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded-lg shadow-l w-[500px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">{formData.id ? "Edit Product" : "Add Product"}</h2>
        <Label htmlFor="product_name">Product Name</Label>
        <Input
          type="text"
          placeholder="Product Name"
          className="w-full"
          value={formData.product_name}
          onChange={(e) =>
            setFormData({ ...formData, product_name: e.target.value })
          }
        />
        <Label htmlFor="product_description">Product Description</Label>
        <Textarea
          placeholder="Product Description"
          className="w-full"
          value={formData.product_description}
          onChange={(e) =>
            setFormData({ ...formData, product_description: e.target.value })
          }
          rows={4}
        />
        <Label htmlFor="product_price">Product Price</Label>
        <Input
          type="number"
          placeholder="Product Price"
          className="w-full"
          value={formData.product_price}
          onChange={(e) =>
            setFormData({ ...formData, product_price: Number(e.target.value) })
          }
        />
        <Button type="submit">{formData.id ? "Update" : "Add"} Product</Button>
      </form>
    </div>
  );
};

export default ProductForm;
