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
import { CalendarDays, Users } from "lucide-react";
import { Booking } from "@/types/booking";

interface ViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  booking: Booking;
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

const ViewModal = ({ open, setOpen, booking }: ViewModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Booking Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <DetailItem label="Booking ID">
                <span className="font-mono">{booking.booking_id}</span>
              </DetailItem>
              <Badge className={`${getStatusColor(booking.status)}`}>
                {booking.status}
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-6">
              <DetailItem label="Check-in Date">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(booking.check_in_date)}</span>
                </div>
              </DetailItem>

              <DetailItem label="Check-out Date">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(booking.check_out_date)}</span>
                </div>
              </DetailItem>
            </div>

            <DetailItem label="Number of Guests">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{booking.number_of_guests} guests</span>
              </div>
            </DetailItem>

            <Separator />

            <DetailItem label="Room ID">
              <span className="font-mono">{booking.room_id}</span>
            </DetailItem>

            <DetailItem label="User ID">
              <span className="font-mono">{booking.user_id}</span>
            </DetailItem>

            {booking.special_requests && (
              <>
                <Separator />
                <DetailItem label="Special Requests">
                  <p className="whitespace-pre-wrap">
                    {booking.special_requests}
                  </p>
                </DetailItem>
              </>
            )}

            <DetailItem label="Created At">
              <time dateTime={booking.created_at.toString()}>
                {new Date(booking.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </DetailItem>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
