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
import { User, Mail, UserCog } from "lucide-react";
import { Users } from "@/types/user";

interface ViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: Users;
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

const ViewModal = ({ open, setOpen, user }: ViewModalProps) => {
  const getUserTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "staff":
        return "bg-blue-100 text-blue-800";
      case "customer":
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
            User Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <DetailItem label="User ID">
                <span className="font-mono">{user.user_id}</span>
              </DetailItem>
              <Badge className={`${getUserTypeColor(user.user_type)}`}>
                {user.user_type}
              </Badge>
            </div>

            <Separator />

            <DetailItem label="Full Name">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <User className="h-5 w-5 text-gray-500" />
                <span>{user.name}</span>
              </div>
            </DetailItem>

            <DetailItem label="Email Address">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{user.email}</span>
              </div>
            </DetailItem>

            <DetailItem label="Account Type">
              <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                <UserCog className="h-5 w-5 text-gray-500" />
                <span className="capitalize">{user.user_type}</span>
              </div>
            </DetailItem>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;