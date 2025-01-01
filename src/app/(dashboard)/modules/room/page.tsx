"use client";
import React, { useState, useEffect } from "react";
import { columns } from "./components/columns";
import { CreateRoom, PagintedRoom } from "@/types/room";
import { DataTable } from "@/components/Data-table";
import { getRooms } from "@/api/room/actions";
import { Button } from "@/components/ui/button";
import CreateRoomForm from "./components/createroom";
import { BsPlusCircle } from "react-icons/bs";
import { createRoom } from "@/api/room/actions";
async function getData(skip: number, limit: number): Promise<PagintedRoom> {
  const data = await getRooms(skip, limit);
  return data;
}

const Page = () => {
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/sign-in";
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PagintedRoom | null>(null);
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

  const handleCreate = (newRoom: FormData) => {
    newRoom.forEach((value, key) => {
      console.log(`FormData: ${key}: ${value}`);
    });
    createRoom(newRoom)
      .then(() => {
        setOpen(false);
      })
      .then(() => {
        window.location.reload();
      });
  };
  

  return (
    <div className="container mx-auto p-10">
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpen(true)}>
          <BsPlusCircle className="h-5 w-5" />
        </Button>
      </div>

      {data && (
        <>
          <DataTable
            columns={columns}
            data={data.rooms}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <CreateRoomForm
            open={open}
            setOpen={setOpen}
            onSubmit={handleCreate}
          />
        </>
      )}
    </div>
  );
};

export default Page;
