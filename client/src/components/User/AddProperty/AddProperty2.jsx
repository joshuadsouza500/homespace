import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/UI/ShadCN/button";
import { Input } from "@/components/UI/ShadCN/input";
import { Label } from "@/components/UI/ShadCN/label";
import { Textarea } from "@/components/UI/ShadCN/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/UI/ShadCN/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ShadCN/select";
import { Checkbox } from "@/components/UI/ShadCN/checkbox";
import Bed_Bath from "@/components/SearchPage/Bed&Bath";
import { useDispatch } from "react-redux";
import { createProperty } from "@/store/property/action";

import UploadWidget from "@/components/CustomComp/UploadWidget";
import SearchBar from "@/components/CustomComp/SearchBar";

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
  const [success, setSuccess] = useState();
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

    if (!data.furnishing) newErrors.furnishing = "Select Furnishing Type";

    setErrors(newErrors); // Update the errors state with the new errors object

    return Object.keys(newErrors).length === 0; // Return true if there are no errors COnverts to array of keys
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (formValidator(formData)) {
      // If the form is valid, dispatch the action and is it is successful display notification
      response = await dispatch(createProperty(formData));
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3500);
      } else {
        console.error("Error creating property:", response.message);
        setSuccess(false);
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const goToNextStep = () => {
    const { image, title, city, governate, address } = formData;
    const newErrors = {};

    // Validate required fields
    if (image.length === 0) newErrors.image = "Image is required";
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
    <div className="container mx-auto px-2 md:px-6 pt-2 sm:pt-6 lg:pt-4 pb-8 dark:bg-[#121212] h-screen ">
      <h1 className="text-3xl text-text md:text-4xl font-bold mb-2 md:mb-4 text-center dark:text-[#F8FDFF]">
        Add New Property
      </h1>
      {/* Sucess or error pop up */}
      {success !== undefined && (
        <div
          className={`fixed z-10 font-semibold  flex items-center gap-2 top-0 lg:top-10 left-1/2 lg:left-[55%] transform -translate-x-1/2 mt-4 px-6 py-4  rounded shadow-md transition-transform duration-500
      ${
        success
          ? "bg-green-500 border-b-2 border-green-600 text-white translate-y-0 "
          : "bg-red-500 border-b-2 border-red-600 text-white -translate-y-0"
      }  `}
        >
          {success ? (
            <>
              <CheckCircle2 className="text-white ring-green-600 size-6" />
              Property created successfully!
            </>
          ) : (
            <>
              <AlertCircle className="text-white ring-red-600 size-6" />
              Error creating Listing!
            </>
          )}
        </div>
      )}

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
        className=" mx-auto   max-w-5xl xl:max-w-6xl  backdrop-blur-md bg-white/70 dark:bg-black/50  border-black/5 dark:border-white/10 shadow-lg p-4 lg:p-8 rounded-lg"
      >
        {currentStep === 1 && (
          <div className="space-y-4 xl:space-y-8">
            <div className="bg-gray-50 h-56    rounded-lg p-1 flex flex-col justify-between overflow-hidden border-2 border-dashed border-gray-300 dark:bg-[#222222] dark:border-[#49494b] [#4D4D4E]">
              {errors.image && (
                <span className="text-red-500  pt-2 md:pt-8 flex items-center gap-1 text-center justify-center">
                  <AlertCircle className="size-4" /> {errors.image}
                </span>
              )}
              <div className="space-x-4 flex" data-testid="image-preview">
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

              <Input
                id="title"
                name="title"
                placeholder="Enter Property title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <span className="text-red-500 text-sm py-0.5  flex items-center gap-1 ">
                  <AlertCircle className="size-4" /> {errors.title}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
              </div>
              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="city">
                  City
                </Label>

                <SearchBar
                  setFilters={
                    (updateFn) => setFormData((prev) => updateFn(prev)) //setFilters takes another function (updateFn) as an argument. When setFilters is called, it executes updateFn, passing the current state of formData to it. // searchbar would send data like this tosetFIlters const updateCity = (prev) => ({ ...prev, city: 'New York' }); which then calls updatFn
                  }
                  city={formData.city} // Pass the current city value
                />
                {errors.city && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1 z-10 relative">
                    <AlertCircle className="size-4" /> {errors.city}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="governate">
                  Governorate
                </Label>

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
                {errors.governate && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                    <AlertCircle className="size-4" /> {errors.governate}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="font-medium font-jakarta" htmlFor="address">
                Address
              </Label>

              <Textarea
                id="address"
                name="address"
                placeholder="Road no: , Block: , Flat no:"
                value={formData.address}
                onChange={handleInputChange}
                className=""
              />
              {errors.address && (
                <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                  <AlertCircle className="size-4" /> {errors.address}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center pt-6">
              <Button
                type="button"
                onClick={goToNextStep}
                className="w-32 md:w-44 bg-Bgpurple gap-x-1 dark:bg-indigo-600 hover:bg-indigo-800 group"
              >
                Next
                <ArrowRight className="size-4 md:size-5 group-hover:translate-x-0.5 transition-transform duration-200 ease-in-out" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 xl:space-y-8 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <Label
                  className="font-medium font-jakarta"
                  htmlFor="propertyType"
                >
                  Property Type{" "}
                </Label>

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
                {errors.property_type && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                    <AlertCircle className="size-4" /> {errors.property_type}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="price">
                  Price
                </Label>

                <div className="relative">
                  <Input
                    id="price"
                    name="price"
                    min={10}
                    type="number"
                    placeholder="Enter Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="dark:bg-[#222222]"
                  />
                </div>
                {errors.price && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                    <AlertCircle className="size-4" /> {errors.price}
                  </span>
                )}
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
                {errors.furnishing && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                    <AlertCircle className="size-4" /> {errors.furnishing}
                  </span>
                )}
              </div>
              <div className="flex flex-col  justify-between pt-1 max-md:gap-y-2  ">
                {" "}
                <Label className="font-medium font-jakarta ">
                  Beds and Baths
                </Label>
                <Bed_Bath
                  onSelectionChange={handleBedBathChange}
                  defaultBaths={formData?.bathrooms}
                  defaultBeds={formData?.bedrooms}
                  className={"w-full max-md:h-10 md:w-full xl:w-full "}
                />
                {errors.bedrooms && errors.bathrooms && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                    <AlertCircle className="size-4" /> {errors.bedrooms}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <Label className="font-medium font-jakarta" htmlFor="area">
                  Area (sq ft)
                </Label>

                <Input
                  id="area"
                  name="area"
                  placeholder="Enter Area"
                  type="number"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="dark:bg-[#222222]"
                />
                {errors.area && (
                  <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                    <AlertCircle className="size-4" /> {errors.area}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label
                className="font-medium font-jakarta "
                htmlFor="description"
              >
                Description
              </Label>

              <Textarea
                id="description"
                name="description"
                placeholder="Description about the property"
                value={formData.description}
                onChange={handleInputChange}
                className="dark:bg-[#222222]"
              />
              {errors.description ? (
                <span className="text-red-500 text-sm p x-2 py-0.5 1 flex items-center gap-1">
                  <AlertCircle className="size-4" /> {errors.description}
                </span>
              ) : (
                <p className="text-sm text-gray-500 dark:text-muted-foreground">
                  Max: 70 words
                </p>
              )}
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
                className="gap-1 border border-Bgpurple bg-white duration-200 text-Bgpurple hover:bg-Bgpurple/90 hover:text-white w-32 md:w-36 transition-colors  ease-in-out group dark:text-indigo-600 dark:hover:bg-white/80"
              >
                <ArrowLeft className="size-4 md:size-5 group-hover:-translate-x-0.5 transition-transform duration-200 ease-in-out" />
                Back
              </Button>
              <Button
                type="submit"
                className="bg-Bgpurple w-32 md:w-40 hover:bg-indigo-800 duration-150 dark:bg-indigo-600 dark:hover:bg-indigo-800"
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
