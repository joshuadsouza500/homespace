import * as React from "react";
import { useState } from "react";
import { Bed, Bath, Maximize } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyById, updateProperty } from "@/store/property/action";
import { UpdateSuccessDialog } from "./UpdateSuccessDialog";
import UploadWidget from "../UploadWidget";

const amenitiesList = [
  { label: "WiFi" },
  { label: "Parking" },
  { label: "Gym" },
  { label: "Garden" },
  { label: "Air Conditioning" },
  { label: "Fireplace" },
  { label: "Balcony" },
  { label: "Security System" },
  { label: "Swimming Pool" },
];

const furnishingOptions = ["Unfurnished", "Semifurnished", "Furnished"];
const utilitiesOptions = ["Inclusive", "Exclusive"];
const propertyTypeOptions = ["Rent", "Sell"];

{
  /**
const citiesInBahrain = [
  "A'ali",
  "Arad",
  "Budaiya",
  "Busaiteen",
  "Duraz",
  "Gudaibiya",
  "Hamad Town",
  "Isa Town",
  "Juffair",
  "Manama",
  "Malkiya",
  "Muharraq",
  "Naim",
  "Riffa",
  "Salmaniya",
  "Salmabad",
  "Sanad",
  "Sehla",
  "Sitra",
  "Tubli",
  "Zinj",
];

const governates = [
  { value: "Capital_Governorate", name: "Capital Governorate" },
  { value: "Northern_Governorate", name: "Northern Governorate" },
  { value: "Southern_Governorate", name: "Southern Governorate" },
  { value: "Muharraq_Governorate", name: "Muharraq Governorate" },
];  
*/
}

//get property id from url and then findpropbyid. and then edit it and dispatch the update function
export default function PropertyUpdate() {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const Property = useSelector((store) => store.property.property);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [details, setDetails] = useState({
    description: "",
    amenities: [""],
    area: "",
    bathrooms: null,
    bedrooms: null,
    furnishing: "",
    image: [""],
    price: "",
    title: "",
    type: "",
    utilities: "",
    // city: "",
    // governate: "",
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (propertyId) {
      dispatch(getPropertyById(propertyId));
    }
  }, [dispatch, propertyId]);

  React.useEffect(() => {
    if (Property) {
      setDetails(Property);
    }
  }, [Property]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (imageUrl) => {
    // Array.isArray(formData.image) ? formData.image : [formData.image];
    setDetails((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
  };
  const handleImageDelete = (index) => {
    setDetails((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index), // Remove image by index
    }));
  };
  const handleAmenityChange = (amenity) => {
    setDetails((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSelectChange = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProperty(details, propertyId));
    if (result.success) {
      setIsDialogOpen(true); // Show success dialog
      console.log(result);
    } else {
      console.log(result.message); // Set error state
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-6 space-y-8  pt-2 lg:pt-6 pb-8">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/70 dark:bg-black/40  border-black/5 dark:border-white/10 shadow-lg px-5 py-4 rounded-lg"
      >
        <div className="bg-gray-50 h-56 pb-1 rounded-lg p-1 flex flex-col justify-between overflow-hidden border-2 border-dashed border-gray-300  ">
          <div className="space-x-4  flex overflow-x-clip ">
            {details?.image.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="size-28 md:size-40 object-cover rounded-sm"
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
        <div className="space-y-4 xl:space-y-6 pt-2 md:pt-4">
          <div>
            <Label className="font-semibold font-jakarta" htmlFor="title">
              Title
            </Label>
            <Input
              name="title"
              value={details?.title}
              onChange={handleChange}
              placeholder="Property Title"
              className="text-xl md:text-2xl font-medium w-full"
            />
          </div>
          <div className="grid grid-cols-2  gap-4">
            <div className="space-y-1">
              <Label className="font-semibold font-jakarta" htmlFor="price">
                Price
              </Label>
              <div className="flex items-center ">
                <Input
                  name="price"
                  type="number"
                  value={details?.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full mr-2 text-text font-bold"
                />
                <span className="max-md:text-sm text-muted-foreground whitespace-nowrap">
                  {details?.type === "Rent" ? "/month" : ""}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="font-jakarta font-semibold" htmlFor="type">
                Type
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
                value={details?.type}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3  gap-4">
            <div className="space-y-1">
              <Label className="md:ml-6 font-semibold" htmlFor="beds">
                Bedrooms
              </Label>
              <div className="flex items-center">
                <Bed className="hidden md:block size-5 mr-2 text-text" />
                <Input
                  name="beds"
                  type="number"
                  value={details?.bedrooms}
                  onChange={handleChange}
                  placeholder="Beds"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="md:ml-6 font-semibold" htmlFor="baths">
                Bathrooms
              </Label>
              <div className="flex items-center">
                <Bath className="hidden md:block size-5 mr-2 text-text" />
                <Input
                  name="baths"
                  type="number"
                  value={details?.bathrooms}
                  onChange={handleChange}
                  placeholder="Baths"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="md:ml-6 font-semibold" htmlFor="area">
                Area
              </Label>
              <div className="flex items-center">
                <Maximize className="hidden md:block size-5 mr-2 text-text" />
                <Input
                  name="area"
                  type="number"
                  value={details?.area}
                  onChange={handleChange}
                  placeholder="Area (sqft)"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="furnishing" className=" font-semibold ">
                Furnishing
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("furnishing", value)
                }
                value={details?.furnishing}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select furnishing" />
                </SelectTrigger>
                <SelectContent>
                  {furnishingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className=" font-semibold " htmlFor="utilities">
                Utilities
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("utilities", value)
                }
                value={details?.utilities}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select utilities" />
                </SelectTrigger>
                <SelectContent>
                  {utilitiesOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/** 
             * <div>
              <Label className="font-medium font-jakarta" htmlFor="city">
                City
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("city", value)}
                value={details?.city}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {citiesInBahrain.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

           <div>
              <Label className="font-medium font-jakarta" htmlFor="governate">
                Governorate
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("governate", value)
                }
                value={details?.governate}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select a governorate" />
                </SelectTrigger>
                <SelectContent>
                  {governates.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <div>
            <h2 className=" font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesList.map(({ label }) => (
                <div key={label} className="flex items-center space-x-2">
                  <Checkbox
                    id={label}
                    checked={details?.amenities.includes(label)}
                    onCheckedChange={() => handleAmenityChange(label)}
                  />
                  <Label
                    htmlFor={label}
                    className="flex items-center cursor-pointer"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Description</h2>
            <Textarea
              name="description"
              value={details?.description}
              onChange={handleChange}
              placeholder="Property description..."
              rows={6}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-center md:pt-2 gap-x-3">
            <Button
              variant="outline"
              className="  border-Bgpurple w-32  hover:bg-indigo-600 hover:text-white "
              onClick={() => {
                navigate("/user/property");
              }}
            >
              Go Back
            </Button>
            <Button
              type="submit"
              className=" bg-Bgpurple w-32 md:w-36 hover:bg-indigo-800"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>{" "}
      <UpdateSuccessDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        propertyId={propertyId}
      />
    </section>
  );
}
