import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Room } from "@/types/room";
import ViewModal from "./viewmodal";
import EditRoom from "./editroom";
import { updateRoom, deleteroom } from "@/api/room/actions";
interface ActionProps {
  id: string;
  room: Room;
}

const Action: React.FC<ActionProps> = ({ id, room }) => {
  const handleView = () => {
    setOpenView(true);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    deleteroom(id);
    // window.location.reload();
  };

  const handleSubmit = (updatedRoom: FormData) => {
    updateRoom(id, updatedRoom);
    setOpenEdit(false);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(id)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewModal open={openView} setOpen={setOpenView} rooms={room} />
      <EditRoom open={openEdit} setOpen={setOpenEdit} room={room} onSubmit={handleSubmit} />
    </>
  );
};

export default Action;
