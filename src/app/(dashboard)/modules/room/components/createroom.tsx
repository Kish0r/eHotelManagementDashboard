import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateRoom } from "@/types/room";

interface CreateRoomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (formData: FormData) => void;
}

const CreateRoomModal = ({ open, setOpen, onSubmit }: CreateRoomModalProps) => {
  const [formData, setFormData] = React.useState<CreateRoom>({
    title: "",
    status: "available",
    price_per_night: 0,
    description: "",
    amenities: [],
    image: "",
  });

  const [amenityInput, setAmenityInput] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price_per_night" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleAmenityAdd = () => {
    if (amenityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const handleAmenityRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitFormData = new FormData();

    submitFormData.append("title", formData.title.trim());
    submitFormData.append("amenities", formData.amenities.join(","));
    submitFormData.append("description", formData.description.trim());
    submitFormData.append("status", formData.status);
    submitFormData.append(
      "price_per_night",
      formData.price_per_night.toString()
    );

    if (selectedImage) {
      submitFormData.append("image", selectedImage);
    }

    onSubmit(submitFormData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Room</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status">
                      {formData.status}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="available" value="available">
                      Available
                    </SelectItem>
                    <SelectItem key="unavailable" value="unavailable">
                      Unavailable
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price_per_night">Price per Night (£) *</Label>
                <Input
                  id="price_per_night"
                  name="price_per_night"
                  type="number"
                  value={formData.price_per_night}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="h-32 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="flex gap-2">
                  <Input
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Add amenity"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleAmenityAdd}
                    className="w-24"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1"
                    >
                      <span>{amenity}</span>
                      <button
                        type="button"
                        onClick={() => handleAmenityRemove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image *</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit">Create Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomModal;
