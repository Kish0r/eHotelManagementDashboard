import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateStatus as updateComplaintStatus } from "@/api/complaints/action";
import { Complaint } from "@/types/complaints";
import ViewModal from "./viewmodal";

interface ActionProps {
  id: string;
  complaint: Complaint;
}

const updateStatus = async (id: string, status: string) => {
  try {
    await updateComplaintStatus(id, status);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const Action: React.FC<ActionProps> = ({ id, complaint }) => {
  const handleView = () => {
    setOpenView(true);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const [openView, setOpenView] = useState(false);
  const [status, setStatus] = useState(complaint.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus); 
    console.log("Id:", id);
    updateStatus(id, newStatus); 
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

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
          <DropdownMenuItem onClick={() => handleStatusChange("open")}>
            Opened
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("resolved")}>
            Resolved
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewModal open={openView} setOpen={setOpenView} complaint={complaint} />
      

    </>
  );
};

export default Action;
