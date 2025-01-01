import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Booking } from "@/types/booking";
import { updateBookingStatus } from "@/api/booking/actions";
import ViewModal from "./viewmodal";

interface ActionProps {
  id: string;
  booking: Booking;
}

const updateStatus = async (id: string, status: string) => {
  try {
    await updateBookingStatus(id, status);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const Action: React.FC<ActionProps> = ({ id, booking }) => {
  const handleView = () => {
    setOpenView(true);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const [openView, setOpenView] = useState(false);
  const [status, setStatus] = useState(booking.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus); 
    updateStatus(id, newStatus); 
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
          <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
            Set as Pending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange("confirmed")}>
            Set as Confirmed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewModal open={openView} setOpen={setOpenView} booking={booking} />
    </>
  );
};

export default Action;
