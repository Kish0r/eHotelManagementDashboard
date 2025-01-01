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
import { CreditCard, CalendarDays, BookOpen, EuroIcon } from "lucide-react";
import { Payment } from "@/types/payment";

interface ViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  payment: Payment;
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

const ViewModal = ({ open, setOpen, payment }: ViewModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Payment Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <DetailItem label="Payment ID">
                <span className="font-mono">{payment.payment_id}</span>
              </DetailItem>
              <Badge className={`${getStatusColor(payment.status)}`}>
                {payment.status}
              </Badge>
            </div>

            <Separator />

            <DetailItem label="Amount">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <EuroIcon className="h-5 w-5 text-gray-500" />
                <span className="font-semibold text-base">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </DetailItem>

            <DetailItem label="Booking Reference">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <BookOpen className="h-5 w-5 text-gray-500" />
                <span className="font-mono">{payment.booking_id}</span>
              </div>
            </DetailItem>

            <DetailItem label="Payment Date">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <CalendarDays className="h-5 w-5 text-gray-500" />
                <span>{formatDate(payment.payment_date)}</span>
              </div>
            </DetailItem>

            <DetailItem label="Transaction Details">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Status</span>
                  <span className="capitalize">{payment.status}</span>
                </div>
              </div>
            </DetailItem>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
