"use client";
import React, { useState } from "react";
import { ProductsTable } from "./ProductsTable";
import ProductForm from "./ProductForm";
import { Product } from "@/interfaces/Product";
import { Button } from "../ui/button";

const ProductsContent = ({ email }: { email: string }) => {
  const [formData, setFormData] = useState<Omit<Product, "id" | "created_at">>({
    product_name: "",
    product_description: "",
    product_price: 0,
    created_by: email,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | undefined>(undefined);
  const handleEditBtn = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      product_name: product.product_name,
      product_description: product.product_description,
      product_price: product.product_price,
      created_by: product.created_by,
    });
    setModalVisible(true);
  };
  return (
    <div className="px-24 py-12 w-full">
      <div className="w-full flex items-center justify-center mb-12 bg-primary text-white py-16 rounded-lg">
        <h2 className="text-3xl font-bold">PRODUCTS</h2>
      </div>
      <div className="w-full flex justify-end mb-4">
        <Button onClick={() => setModalVisible(true)}>Add Product</Button>
      </div>
      <ProductsTable handleEditBtn={handleEditBtn} />
      {modalVisible && (
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          setModalVisible={setModalVisible}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
};

export default ProductsContent;
