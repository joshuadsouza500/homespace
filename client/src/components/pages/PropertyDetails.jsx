import PropertyDetails2 from "../ui/vo/property-details2";
import PropertyDetails1 from "../ui/vo/property-details1";
import Navbar from "../ui/vo/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProperties,
  getPropertyById,
  saveProperty,
} from "@/store/property/action";
import { useEffect } from "react";
import SimilarProps from "../ui/vo/SimilarProps";

const PropertyDetails = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const Property = useSelector((store) => store.property);

  useEffect(() => {
    if (propertyId) {
      dispatch(getPropertyById(propertyId));
      dispatch(getAllProperties());
    }
  }, [dispatch, propertyId]);

  const handleSave = async (propertyId) => {
    try {
      await dispatch(saveProperty(propertyId));
      dispatch(getPropertyById(propertyId));
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };
  console.log(Property);
  return (
    <div className=" px-2 md:px-6 w-full max-w-6xl 2xl:max-w-7xl  font-jakarta bg-gradient-b from-white to-light_gray mx-auto">
      <PropertyDetails2 property={Property?.property} handleSave={handleSave} />
      <section className="bg-light_gray h-full mt-8 md:my-16">
        <h1 className="text-4xl font-bold text-center pt-6 pb-6 md:pb-10 text-text">
          Similar Properties
        </h1>
        <div className="gap-y-8 space-x-4 justify-center lg:justify-start  mx-auto  flex flex-wrap ">
          {Property.properties?.slice(0, 5).map((property) => (
            <SimilarProps key={property?.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
