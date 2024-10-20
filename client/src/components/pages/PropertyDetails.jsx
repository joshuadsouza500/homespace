import PropertyDetails2 from "../ui/vo/property-details2";
import PropertyDetails1 from "../ui/vo/property-details1";
import Navbar from "../ui/vo/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPropertyById } from "@/store/property/action";
import { useEffect } from "react";
const PropertyDetails = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const Property = useSelector((store) => store.property.property);

  useEffect(() => {
    if (propertyId) {
      dispatch(getPropertyById(propertyId));
    }
  }, [dispatch, propertyId]);
  console.log("ppewirhn", Property);
  return (
    <div className="max-w-6xl bg-gradient-b from-white to-light_gray mx-auto">
      <Navbar />
      <PropertyDetails2 property={Property} />
      <section className="bg-Bgpurple h-96">
        <h1 className="text-4xl font-bold text-center py-6 text-white">
          Browse similar Properties
        </h1>
      </section>
    </div>
  );
};

export default PropertyDetails;
