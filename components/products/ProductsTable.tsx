"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/interfaces/Product";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getProducts } from "@/lib/supabase/Products";

export function ProductsTable({
  handleEditBtn,
}: {
  handleEditBtn: (product: Product) => void;
}) {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "product_name",
      header: "Name",
    },
    {
      accessorKey: "product_description",
      header: "Description",
    },
    {
      accessorKey: "product_price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("product_price") as number;
        return <span>${price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = new Date(row.getValue("created_at") as string);
        return <span>{createdAt.toLocaleDateString()}</span>;
      },
    },
    {
      accessorKey: "created_by",
      header: "Created By",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <Button
            variant={"ghost"}
            onClick={() => {
              handleEditBtn(product);
            }}
          >
            <Edit />
          </Button>
        );
      },
    },
  ];
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      if (data instanceof Error) {
        console.error("Error fetching products:", data.message);
      } else {
        setData(data as Product[]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const channel = supabase
      .channel("products-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          console.log("Realtime event:", payload);

          if (payload.eventType === "INSERT") {
            setData((prev) => [...prev, payload.new as Product]);
          }

          if (payload.eventType === "UPDATE") {
            setData((prev) =>
              prev.map((p) =>
                p.id === (payload.new as Product).id
                  ? (payload.new as Product)
                  : p
              )
            );
          }

          if (payload.eventType === "DELETE") {
            setData((prev) =>
              prev.filter((p) => p.id !== (payload.old as Product).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end py-4 space-x-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
