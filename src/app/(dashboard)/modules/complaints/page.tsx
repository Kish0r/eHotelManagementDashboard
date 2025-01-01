"use client";
import React, { useState, useEffect } from "react";
import { Complaint, PaginatedComplaints } from "@/types/complaints";
import { columns } from "./components/columns";
import { DataTable } from "@/components/Data-table";
import { getComplaints } from "@/api/complaints/action";
async function getData(
  skip: number,
  limit: number
): Promise<PaginatedComplaints> {
  const data = await getComplaints(skip, limit);
  return data;
}

const Page = () => {
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/sign-in";
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PaginatedComplaints | null>(null);
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
            data={data.complaints}
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
