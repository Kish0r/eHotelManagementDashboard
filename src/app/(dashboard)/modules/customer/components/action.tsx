import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users } from "@/types/user";
import ViewModal from "./viewmodal";
import { deleteCustomer } from "@/api/users/actions";

interface ActionProps {
  id: string;
  users: Users;
}

const handleDelete = async (id: string) => {
  await deleteCustomer(id);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const Action: React.FC<ActionProps> = ({ id, users }) => {
  const handleView = () => {
    setOpenView(true);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const [openView, setOpenView] = useState(false);

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
          {/* Dropdown menu items for status */}
          {/* <DropdownMenuItem onClick={() => handleDelete(id)}>
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewModal open={openView} setOpen={setOpenView} user={users} />
    </>
  );
};

export default Action;
