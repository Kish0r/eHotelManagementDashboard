import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCircle } from "lucide-react";
import { Complaint } from "@/types/complaints";

interface ViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  complaint: Complaint;
}

interface DetailItemProps {
  label: string;
  children: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, children }) => (
  <div className="space-y-2">
    <h4 className="font-semibold text-sm text-gray-700">{label}</h4>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

const ViewModal = ({ open, setOpen, complaint }: ViewModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Complaint Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <DetailItem label="Complaint ID">
                <span className="font-mono">{complaint.complaint_id}</span>
              </DetailItem>
              <Badge className={`${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </Badge>
            </div>

            <Separator />

            <DetailItem label="Related Booking">
              <span className="font-mono">{complaint.booking_id}</span>
            </DetailItem>

            <DetailItem label="User ID">
              <span className="font-mono">{complaint.user_id}</span>
            </DetailItem>

            <Separator />

            <DetailItem label="Complaint Message">
              <div className="flex items-start gap-2 bg-gray-50 p-4 rounded-lg">
                <MessageCircle className="h-5 w-5 mt-1 text-gray-500" />
                <p className="whitespace-pre-wrap">{complaint.message}</p>
              </div>
            </DetailItem>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
