import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Product } from "@/interfaces/Product";
import { createProduct, updateProduct } from "@/lib/supabase/Products";
import { X } from "lucide-react";
interface ProductFormProps {
  formData: Omit<Product, "created_at">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<Product, "created_at">>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editingId?: number | undefined;
  setEditingId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  setFormData,
  setModalVisible,
  editingId,
  setEditingId,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, {
        product_name: formData.product_name,
        product_description: formData.product_description,
        product_price: formData.product_price,
      }).then(() => {
        setModalVisible(false);
        setFormData({
          product_name: "",
          product_description: "",
          product_price: 0,
          created_by: formData.created_by,
        });
      });
    } else {
      createProduct(formData).then(() => {
        setModalVisible(false);
        setFormData({
          product_name: "",
          product_description: "",
          product_price: 0,
          created_by: formData.created_by,
        });
      });
    }
  };
  const cancelSubmit = () => {
    if (editingId) {
      setEditingId(undefined);
    }
    setFormData({
      product_name: "",
      product_description: "",
      product_price: 0,
      created_by: formData.created_by,
    });
    setModalVisible(false);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-lg shadow-l w-[500px] flex flex-col gap-4 relative"
        onSubmit={handleSubmit}
      >
        <Button
          type="button"
          className="absolute top-2 right-2 rounded-full w-8 h-8"
          onClick={cancelSubmit}
        >
          <X />
        </Button>
        <h2 className="text-2xl font-bold">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
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
        <Button type="submit">{editingId ? "Update" : "Add"} Product</Button>
      </form>
    </div>
  );
};

export default ProductForm;
