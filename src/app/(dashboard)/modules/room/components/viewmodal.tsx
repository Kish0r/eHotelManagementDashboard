import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Room } from "@/types/room";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  rooms: Room;
}

interface DetailItemProps {
  label: string;
  children: React.ReactNode;
}

const APP_URL = process.env.NEXT_PUBLIC_API_URL;

const DetailItem: React.FC<DetailItemProps> = ({ label, children }) => (
  <div className="space-y-2">
    <h4 className="font-semibold text-sm text-gray-700">{label}</h4>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

const ViewModal = ({ open, setOpen, rooms }: ViewModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "unavailable":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Room Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <DetailItem label="Title">
              <h3 className="text-lg font-medium">{rooms.title}</h3>
            </DetailItem>

            <Separator />

            <DetailItem label="Status">
              <Badge className={`${getStatusColor(rooms.status)}`}>
                {rooms.status}
              </Badge>
            </DetailItem>

            <DetailItem label="Price per Night">
              <span className="text-lg font-semibold">
              £{rooms.price_per_night.toLocaleString()}
              </span>
            </DetailItem>

            <Separator />

            <DetailItem label="Description">
              <p className="whitespace-pre-wrap">{rooms.description}</p>
            </DetailItem>

            <DetailItem label="Amenities">
              <div className="flex flex-wrap gap-2">
                {rooms.amenities.map((amenity, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-50"
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </DetailItem>

            {rooms.image && (
              <DetailItem label="Image">
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <img
                    src={`${APP_URL}/${rooms.image}`}
                    alt={rooms.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </DetailItem>
            )}

            <DetailItem label="Created At">
              <time dateTime={rooms.created_at.toString()}>
                {new Date(rooms.created_at).toLocaleDateString("en-US", {
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
