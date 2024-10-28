import { useState } from "react";
import { Upload, DollarSign, Home, MoveUpIcon } from "lucide-react";
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
import { useDispatch } from "react-redux";
import { createProperty } from "@/store/property/action";
import UploadWidget from "../ui/UploadWidget";

const propertyTypes = ["Apartment", "Studio", "Villa", "Penthouse", "Condo"];

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
    description: "",
    price: "",
    location: "",
    city: "",
    longitude: "",
    latitude: "",
    //Array.isArray(formData.image) ? formData.image : [formData.image], // Force to array
    image: [],
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "Rent",
    property_type: "",
    utilities: "Exclusive",
    furnishing: "",
    amenities: [],
  });

  const dispatch = useDispatch();

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

  const handleImageUpload = (imageUrl) => {
    // Array.isArray(formData.image) ? formData.image : [formData.image];
    setFormData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
  };
  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index), // Remove image by index
    }));
  };
  const handleBedBathChange = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting property:", formData);
    dispatch(createProperty(formData));
  };

  console.log(formData);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-text text-center">
        Add New Property
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/** 
         *  <div className="space-y-4">
          <Label htmlFor="image">Property Image</Label>
          <div className="flex items-center space-x-4">
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Property preview"
                className="w-24 h-24 object-cover rounded"
              />
            )}
          
         *  <Label htmlFor="image" className="cursor-pointer">
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
        </div> */}
        <div className="bg-gray-200 h-56  w-full rounded-lg flex flex-col justify-between items-start">
          <div className="space-x-4 flex ">
            {formData.image.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="h-40 w-40 object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white  size-6 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <UploadWidget
            uwConfig={{
              cloudName: "diafh6bdm",
              uploadPreset: "homespace",
              multiple: true,
              maxImageFileSize: 2000000,
              folder: "avatars",
            }}
            handleImageUpload={handleImageUpload}
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row w-full gap-2">
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

            <div className="flex sm:w-[50%] gap-2">
              <div className="flex-1">
                <Label htmlFor="type">To Rent or Sell</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 relative">
                <Label htmlFor="price">Price</Label>
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={formData.price}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* New fields: City, Latitude, Longitude, Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-lg:p-4 ">
            <div className="flex flex-col">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                name="propertyType"
                value={formData.property_type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, property_type: value }))
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
            <div className="flex flex-col">
              <Label className="pb-1">Bedrooms and Bathrooms</Label>
              <Bed_Bath onSelectionChange={handleBedBathChange} />
            </div>

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
                  <SelectItem value="Unfurnished">UnFurnished</SelectItem>
                  <SelectItem value="Semifurnished">Semi Furnished</SelectItem>
                  <SelectItem value="Furnished">Fully Furnished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Utilities</Label>
              <RadioGroup
                name="Utilities"
                value={formData.utilities}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, utilities: value }))
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Exclusive" id="Exclusive" />
                  <Label htmlFor="Exclusive">Exclusive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Inclusive" id="Inclusive" />
                  <Label htmlFor="Inclusive">Inclusive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Textarea
              id="location"
              name="location"
              value={formData.location}
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
