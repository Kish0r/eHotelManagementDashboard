import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Payment } from "@/types/payment";
import ViewModal from "./viewmodal";
import { updatePayment } from "@/api/payment/actions";

interface ActionProps {
  id: string;
  payments: Payment;
}

const handleStatusChange = async (payment_id: string, newStatus: string) => {
  await updatePayment(payment_id, newStatus);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
const Action: React.FC<ActionProps> = ({ id, payments }) => {
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(id, "completed")}
                >
                  <span>Completed</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(id, "pending")}
                >
                  <span>Pending</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleStatusChange(id, "failed")}
                >
                  <span>Failed</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewModal open={openView} setOpen={setOpenView} payment={payments} />
    </>
  );
};

export default Action;
