"use client";
import Link from "next/link";
import { ProductsChart } from "../products/ProductCharts";
import { UsersChart } from "../users/UsersChart";

const HomeContent = () => {
  return (
    <div className="px-24 py-12 w-full">
      <div className="flex gap-8">
        <div className="relative w-1/2">
          <ProductsChart />
          <Link
            className="absolute top-4 right-4"
            href="/products"
          >
            View all products
          </Link>
        </div>
        <div className="relative w-1/2">
          <UsersChart />
          <Link
            className="absolute top-4 right-4"
            href="/users"
          >
            View all users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;

