import PropertyDetails2 from "../ui/vo/property-details2";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAllProperties,
  getPropertyById,
  saveProperty,
} from "@/store/property/action";
import { useEffect } from "react";
import SimilarProps from "../ui/vo/SimilarProps";

import { Button } from "../ui/button";

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

  return (
    <div className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto   font-jakarta bg-gradient-b from-estate-50 to-light_gray">
      <PropertyDetails2 property={Property?.property} handleSave={handleSave} />
      <div>Faq Section</div>
      <section className=" bg-estate-50 h-full mt-8 md:my-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center pt-6 pb-2 md:pb-3 text-text">
          Similar Properties
        </h1>
        <p className=" max-sm:text-sm  text-pretty text-[#4d5461]  text-center pb-10">
          Checkout some other properties near you
        </p>

        <div className="max-md:overflow-y-scroll lg:gap-y-12 gap-x-4 lg:gap-x-8 justify-center lg:justify-center  mx-auto  flex md:flex-wrap similarProps">
          {Property.properties?.slice(0, 6).map((property) => (
            <SimilarProps key={property?.id} property={property} />
          ))}
        </div>
        <div className="w-full flex justify-center py-8 md:py-14">
          <Link to="/property">
            <Button className="flex  h-11 bg-indigo-700 px-6  rounded-lg hover:bg-Primary Bgpurple/80 text-white text-sm tracking-wide font-semibold hover:shadow-lg">
              Browse Properties
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
