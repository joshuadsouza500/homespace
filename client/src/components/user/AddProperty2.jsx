import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckIcon } from "lucide-react";
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
import SearchBar from "../ui/SearchBar";

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
const governates = [
  { value: "Capital_Governorate", name: "Capital Governorate" },
  { value: "Northern_Governorate", name: "Northern Governorate" },
  { value: "Southern_Governorate", name: "Southern Governorate" },
  { value: "Muharraq_Governorate", name: "Muharraq Governorate" },
];
export default function AddProperty2() {
  const [currentStep, setCurrentStep] = useState(1); // Step indicator
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    governate: "",
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

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
  };

  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleBedBathChange = (type, value) => {
    setFormData((prev) => ({ ...prev, [type]: value }));
  };

  const formValidator = (data) => {
    const newErrors = {}; // Create a new object to store errors

    if (!data.description) newErrors.description = "Description is required";
    if (!data.price) newErrors.price = "Price is required";
    if (data.price < 0) {
      newErrors.price = "Price must be a positive number";
    }
    if (!data.bedrooms) newErrors.bedrooms = "Select Bedrooms & Baths";
    if (!data.bathrooms) newErrors.bathrooms = "Select Bedrooms & Baths";
    if (!data.area) newErrors.area = "Area is required";
    if (!data.property_type)
      newErrors.property_type = "Property type is required";
    if (!data.utilities) newErrors.utilities = "Utilities are required";
    if (!data.furnishing) newErrors.furnishing = "Select Furnishing Type";

    setErrors(newErrors); // Update the errors state with the new errors object

    return Object.keys(newErrors).length === 0; // Return true if there are no errors COnverts to array of keys
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle submit is triggered");
    if (formValidator(formData)) {
      // If the form is valid, dispatch the action
      // dispatch(createProperty(formData));
      console.log("Validation passed:");
    } else {
      console.log("Validation failed apple:", errors);
    }
  };

  const goToNextStep = () => {
    const { image, title, city, governate, address } = formData;
    const newErrors = {};

    // Validate required fields
    // if (image.length === 0) newErrors.image = "Image is required";
    if (!title) newErrors.title = "Title is required";
    if (!city) newErrors.city = "City is required";
    if (!governate) newErrors.governate = "Governorate is required";
    if (!address) newErrors.address = "Address is required";

    setErrors(newErrors); // Update the errors state with the new errors object
    // Proceed to the next step only if there are no errors
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="container mx-auto px-2 md:px-6 pt-2 lg:pt-4 pb-8">
      <h1 className="text-3xl text-text md:text-4xl font-bold mb-2 md:mb-4 text-center">
        Add New Property
      </h1>

      {/* Step Indicator */}
      <div className="flex justify-center mb-6 md:mb-8 space-x-2 items-center text-sm cursor-pointer ">
        <div
          className={`size-8 flex items-center justify-center font-bold   rounded-full text-gray-800   ${
            currentStep === 1
              ? " bg-gray-100 ring-1 ring-indigo-600"
              : "bg-blue-600 "
          }`}
          onClick={goToPreviousStep}
        >
          {currentStep === 1 ? (
            <span className="">1</span>
          ) : (
            <CheckIcon className="text-white" />
          )}
        </div>
        <span>
          {" "}
          <hr className="w-14 md:w-20 h-[2px] "></hr>
        </span>
        <div
          className={`size-8 flex items-center justify-center font-bold   rounded-full text-gray-800 bg-gray-200 ${
            currentStep === 2 ? " ring-1 ring-indigo-600" : ""
          }`}
          onClick={goToNextStep}
        >
          <span className="">2</span>
        </div>
      </div>
      {/* Inside a form unless a button type is specified as different it will be type submit as default */}
      <form
        onSubmit={handleSubmit}
        className=" mx-auto   max-w-5xl xl:max-w-6xl  backdrop-blur-md bg-white/70 dark:bg-black/40  border-black/5 dark:border-white/10 shadow-lg p-4 lg:p-8 rounded-lg"
      >
        {currentStep === 1 && (
          <div className="space-y-4 xl:space-y-8">
            <div className="bg-gray-50 h-56    rounded-lg p-1 flex flex-col justify-between overflow-hidden border-2 border-dashed border-gray-300">
              <div className="space-x-4 flex">
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
            <div>
              <Label className="font-medium font-jakarta" htmlFor="title">
                Title
              </Label>
              {errors.title && (
                <span className="text-red-500 text-sm px-2 pb-1 ">
                  *{errors.title}*
                </span>
              )}
              <Input
                id="title"
                name="title"
                placeholder="Enter Property title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex-1 flex-col justify-end flex gap-y-2">
                <Label className="font-medium font-jakarta" htmlFor="type">
                  Rent or Sell
                </Label>
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
                {errors.type && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.type}*
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="city">
                  City
                </Label>
                {errors.city && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.city}*
                  </span>
                )}
                <SearchBar
                  setFilters={
                    (updateFn) => setFormData((prev) => updateFn(prev)) //setFilters takes another function (updateFn) as an argument. When setFilters is called, it executes updateFn, passing the current state of formData to it. // searchbar would send data like this tosetFIlters const updateCity = (prev) => ({ ...prev, city: 'New York' }); which then calls updatFn
                  }
                  city={formData.city} // Pass the current city value
                />
              </div>
              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="governate">
                  Governorate
                </Label>
                {errors.governate && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.governate}
                  </span>
                )}
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, governate: value }))
                  }
                  value={formData.governate}
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
              </div>
            </div>
            <div className="space-y-1">
              <Label className="font-medium font-jakarta" htmlFor="address">
                Address
              </Label>
              {errors.address && (
                <span className="text-red-500 text-sm px-2 pb-1">
                  *{errors.address}
                </span>
              )}
              <Textarea
                id="address"
                name="address"
                placeholder="Road no: , Block: , Flat no:"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center justify-center pt-6">
              <Button
                type="button"
                onClick={goToNextStep}
                className="w-32 md:w-44 bg-Bgpurple gap-x-1 hover:bg-indigo-800 group"
              >
                Next
                <ArrowRight className="size-4 md:size-5 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 xl:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <Label
                  className="font-medium font-jakarta"
                  htmlFor="propertyType"
                >
                  Property Type{" "}
                </Label>

                {errors.property_type && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.property_type}*
                  </span>
                )}
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
              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="price">
                  Price
                </Label>
                {errors.price && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.price}*
                  </span>
                )}
                <div className="relative">
                  <Input
                    id="price"
                    name="price"
                    min={10}
                    type="number"
                    placeholder="Enter Price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className=" h-full md:ml-2 flex flex-col gap-y-2  md:justify-around  ">
                <Label className="font-medium font-jakarta">Utilities</Label>

                <RadioGroup
                  name="Utilities"
                  value={formData.utilities}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, utilities: value }))
                  }
                  className="flex gap-x-4 "
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Exclusive" id="Exclusive" />
                    <Label
                      className="font-medium font-jakarta"
                      htmlFor="Exclusive"
                    >
                      Exclusive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Inclusive" id="Inclusive" />
                    <Label
                      className="font-medium font-jakarta"
                      htmlFor="Inclusive"
                    >
                      Inclusive
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            {/* bedsand bath, furniture and utilities*/}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
              <div className="space-y-1">
                <Label
                  className="font-medium font-jakarta"
                  htmlFor="furnishing"
                >
                  Furnishing
                </Label>
                {errors.furnishing && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.furnishing}*
                  </span>
                )}
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
                    <SelectItem value="Semifurnished">
                      Semi Furnished
                    </SelectItem>
                    <SelectItem value="Furnished">Fully Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col  justify-between pt-1 max-md:gap-y-2  ">
                <div className="flex">
                  {" "}
                  <Label className="font-medium font-jakarta ">
                    Beds and Baths
                  </Label>
                  {errors.bedrooms && errors.bathrooms && (
                    <span className="text-red-500 text-sm px-2 pb-1">
                      *{errors.bedrooms}*
                    </span>
                  )}
                </div>
                <Bed_Bath
                  onSelectionChange={handleBedBathChange}
                  defaultBaths={formData?.bathrooms}
                  defaultBeds={formData?.bedrooms}
                  className={"w-full md:w-full xl:w-full "}
                />
              </div>

              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="area">
                  Area (sq ft)
                </Label>

                {errors.area && (
                  <span className="text-red-500 text-sm px-2 pb-1">
                    *{errors.area}*
                  </span>
                )}
                <Input
                  id="area"
                  name="area"
                  placeholder="Enter Area"
                  type="number"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label
                className="font-medium font-jakarta "
                htmlFor="description"
              >
                Description
              </Label>

              {errors.description && (
                <span className="text-red-500 text-sm px-2 pb-1">
                  *{errors.description}*
                </span>
              )}
              <Textarea
                id="description"
                name="description"
                placeholder="Description about the property"
                value={formData.description}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">Max: 70 words</p>
            </div>
            <div>
              <Label className="font-medium font-jakarta">Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 md:mt-4">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityChange(amenity)}
                    />
                    <Label
                      className="font-medium font-jakarta"
                      htmlFor={amenity}
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-x-4   pt-6 pb-4 font-medium">
              <Button
                type="button"
                onClick={goToPreviousStep}
                className="gap-1 border border-Bgpurple bg-white duration-200 text-Bgpurple hover:bg-Bgpurple/90 hover:text-white w-32 md:w-36 transition-colors  ease-in-out group"
              >
                <ArrowLeft className="size-4 md:size-5 group-hover:-translate-x-1 transition-transform duration-200 ease-in-out" />
                Back
              </Button>
              <Button
                type="submit"
                className="bg-Bgpurple w-32 md:w-40 hover:bg-indigo-800 duration-150"
              >
                Add Property
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
