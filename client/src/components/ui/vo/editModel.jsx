"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Trash2Icon, MapPin, Bed, Bath, Maximize } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Phone, Mail, Heart } from "lucide-react";

export default function PropertyCard2({ update = true, className = "" }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [propertyData, setPropertyData] = useState({
    title: "Star Sun Hotel & Apartment",
    price: "68,000",
    address: "Al Juffair, Capital Governorate",
    type: "Villa",
    bedrooms: "4",
    bathrooms: "5",
    area: "600",
    description:
      "This apartment by Star Hotel is an en-suite that has a room connected to an apartment, which is comfortable and clean. The apartment features a beautiful view of surrounding hills. You can enjoy the sunrise, in the morning from your room.",
    amenities: [
      "Swimming pool access",
      "Walk in closets",
      "Built in Desks in some units",
      "Private Balcony",
      "Oversized Soaking Tubs in some units",
    ],
    images: ["/HomeCard2.png", "/HomeCard3.png", "/HomeCard3.png"],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...propertyData.amenities];
    newAmenities[index] = value;
    setPropertyData((prev) => ({ ...prev, amenities: newAmenities }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...propertyData.images];
    newImages[index] = value;
    setPropertyData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted, closing modal");
    setIsEditModalOpen(false);
    console.log("Updated property data:", propertyData);
  };

  return (
    <>
      <Card
        className={cn(
          "max-w-sm sm:max-w-lg md:max-w-3xl mx-1 lg:h-64 cursor-pointer hover:shadow-md",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row lg:h-full">
          <div className="relative w-full sm:w-2/5 ">
            <img
              src={propertyData.images[0]}
              alt="Property"
              width={400}
              height={300}
              className="w-full h-[200px] sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
            />
            <Badge className="absolute top-2 left-2 bg-green-500 text-white">
              For Sale
            </Badge>
            <div className="absolute bottom-2 left-[38%] flex space-x-1">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-white opacity-60"
                />
              ))}
            </div>
          </div>
          <CardContent className="p-4 sm:w-3/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {propertyData.type}
                  </Badge>
                  <h2 className="text-2xl font-bold text-Bgpurple">
                    {propertyData.price} BHD
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center text-muted-foreground text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1 text-Primary flex-shrink-0" />
                <span>{propertyData.address}</span>
              </div>
              <div className="flex justify-start gap-2 text-sm text-muted-foreground mb-4 pl-1">
                <div className="flex items-center border-r-2 pr-2">
                  <Bed className="h-4 w-4 mr-1 text-Primary" />
                  <span>{propertyData.bedrooms}</span>
                </div>
                <div className="flex items-center border-r-2 pr-2">
                  <Bath className="h-4 w-4 mr-1 text-Primary" />
                  <span>{propertyData.bathrooms}</span>
                </div>
                <div className="flex items-center  pr-2">
                  <Maximize className="h-4 w-4 mr-1 text-Primary" />
                  <span>{propertyData.area} sqm</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t">
              <span className="text-xs text-muted-foreground">
                Listed 1 day ago
              </span>
              {update ? (
                <div className="flex space-x-2 items-center ">
                  <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-24 h-10 font-medium bg-Bgpurple hover:bg-Bgpurple/85 text-white hover:text-white"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Property Details</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {propertyData.images.map((img, index) => (
                            <div key={index} className="space-y-2">
                              <Label htmlFor={`image-${index}`}>
                                Image {index + 1}
                              </Label>
                              <Input
                                id={`image-${index}`}
                                value={img}
                                onChange={(e) =>
                                  handleImageChange(index, e.target.value)
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            value={propertyData.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Price (BHD)</Label>
                            <Input
                              id="price"
                              name="price"
                              value={propertyData.price}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Input
                              id="type"
                              name="type"
                              value={propertyData.type}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={propertyData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Input
                              id="bedrooms"
                              name="bedrooms"
                              value={propertyData.bedrooms}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <Input
                              id="bathrooms"
                              name="bathrooms"
                              value={propertyData.bathrooms}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="area">Area (sqm)</Label>
                            <Input
                              id="area"
                              name="area"
                              value={propertyData.area}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={propertyData.description}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Amenities</Label>
                          {propertyData.amenities.map((amenity, index) => (
                            <Input
                              key={index}
                              value={amenity}
                              onChange={(e) =>
                                handleAmenityChange(index, e.target.value)
                              }
                              className="mb-2"
                            />
                          ))}
                        </div>
                        <Button type="submit" className="w-full">
                          Save Changes
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-24 font-medium"
                      >
                        <Trash2Icon className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete your Property Listing?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your property listing and remove it from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="flex space-x-2 items-center">
                  <Button variant="outline" size="sm" className="text-primary">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="text-primary">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-primary "
                  >
                    <Heart className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}
