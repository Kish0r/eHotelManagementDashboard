"use client";
import React, { useState, useEffect } from "react";
import { Booking, PaginatedBookings } from "@/types/booking";
import { columns } from "./components/columns";
import { DataTable } from "@/components/Data-table";
import { getBooking } from "@/api/booking/actions";
import { Button } from "@/components/ui/button";
import { BsPlusCircle } from "react-icons/bs";
import { createRoom } from "@/api/room/actions";
async function getData(
  skip: number,
  limit: number
): Promise<PaginatedBookings> {
  const data = await getBooking(skip, limit);
  return data;
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PaginatedBookings | null>(null);
  const [open, setOpen] = useState(false);
  const limit = 10;
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/sign-in";
    }
  });

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

  const handleCreate = (newRoom: FormData) => {
    newRoom.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    createRoom(newRoom).then(() => {
      setOpen(false);
    });
  };

  return (
    <div className="container mx-auto p-10">
      {data && (
        <>
          <DataTable
            columns={columns}
            data={data.bookings}
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
