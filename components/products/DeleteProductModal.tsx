"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/lib/supabase/Products";

interface DeleteProductModalProps {
  setDeletingId: React.Dispatch<React.SetStateAction<number | undefined>>;
  deletingId: number | undefined;
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProductModal = ({
  setDeletingId,
  deletingId,
  setDeleteModalVisible,
}: DeleteProductModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const handleCancel = () => {
    setDeletingId(undefined);
    setDeleteModalVisible(false);
  };
  const handleDelete = () => {
    if (deletingId) {
      deleteProduct(deletingId).then(() => {
        setDeletingId(undefined);
        setDeleteModalVisible(false);
      });
    } else {
      setError("Product ID is undefined");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
