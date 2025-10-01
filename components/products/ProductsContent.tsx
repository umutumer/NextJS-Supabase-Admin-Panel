"use client";
import React, { useState } from 'react'
import { ProductsTable } from './ProductsTable'
import ProductForm from './ProductForm'
import { Product } from '@/interfaces/Product';

const ProductsContent = ({ email }: { email: string }) => {
    const [formData,setFormData] = useState<Omit<Product, "created_at">>({
        id: 0,
        product_name: '',
        product_description: '',
        product_price: 0,
        created_by: email
    })
  return (
    <div className="px-24 py-12 w-full">
        <div className='w-full flex items-center justify-center mb-12 bg-primary text-white py-16 rounded-lg'>
            <h2 className='text-3xl font-bold'>PRODUCTS</h2>
        </div>
        <ProductsTable />
        <ProductForm formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default ProductsContent