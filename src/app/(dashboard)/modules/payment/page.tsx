"use client";
import React, { useState, useEffect } from "react";
import { Payment, PaginatedPayment } from "@/types/payment";
import { columns } from "./components/columns";
import { DataTable } from "@/components/Data-table";
import { getPayment } from "@/api/payment/actions";
async function getData(
  skip: number,
  limit: number
): Promise<PaginatedPayment> {
  const data = await getPayment(skip, limit);
  return data;
}

const Page = () => {
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/sign-in";
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PaginatedPayment | null>(null);
  const [open, setOpen] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const skip = (currentPage - 1) * limit;
      const result = await getData(skip, limit);
      setData(result);
    };

    fetchData();
  }, [currentPage]);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-10">
      {data && (
        <>
          <DataTable
            columns={columns}
            data={data.payments}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Page;
