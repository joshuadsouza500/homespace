import { useState } from "react";
import { Upload, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Bed_Bath from "../ui/Bed&Bath";

const propertyTypes = ["Apartment", "Studio", "Villas", "Penthouse", "Condo"];

const amenities = [
  "Air Conditioning",
  "Parking",
  "Swimming Pool",
  "Gym",
  "Wifi",
  "Balcony",
  "Garden",
  "Security System",
  "Fireplace",
];

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    price: "",
    Utilities: "exclusive",
    propertyType: "",
    amenities: [],
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log("Submitting property:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-text text-center">
        Add New Property
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="image">Property Image</Label>
          <div className="flex items-center space-x-4">
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Property preview"
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <Label htmlFor="image" className="cursor-pointer">
              <div className="flex items-center justify-center w-24 h-24 bg-muted rounded">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row w-full gap-2">
            {/* Title */}
            <div className="w-full sm:w-[50%]">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Rent or Buy and Price */}
            <div className="flex sm:w-[50%] gap-2">
              {/* Rent or Sell selector */}
              <div className="flex-1">
                <Label htmlFor="propertySale">To Rent or Sell</Label>
                <Select
                  name="propertySale"
                  value={formData.propertySale}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, propertySale: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price input */}
              <div className="flex-1 relative">
                <Label htmlFor="price">Price</Label>
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-lg:p-4 ">
            {/**Property type */}
            <div className="flex flex-col">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                name="propertyType"
                value={formData.propertyType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, propertyType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Utilities</Label>
              <RadioGroup
                name="Utilities"
                value={formData.Utilities}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, Utilities: value }))
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclusive" id="exclusive" />
                  <Label htmlFor="exclusive">Exclusive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inclusive" id="inclusive" />
                  <Label htmlFor="inclusive">Inclusive</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col">
              <Label className="pb-1">Bedrooms and Bathrooms</Label>
              <Bed_Bath />
            </div>

            {/**Furnishing */}
            <div>
              <Label htmlFor="furnishing">Furnishing</Label>
              <Select
                name="furnishing"
                value={formData.furnishing}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, furnishing: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Furnishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unfurnished">UnFurnished</SelectItem>
                  <SelectItem value="semifurnished">Semi Furnished</SelectItem>
                  <SelectItem value="fullyfurnished">
                    Fully Furnished
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" className="w-40 bg-Bgpurple ">
            <Home className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}
