import PropertySearch from "../PropertySearch";

import PropertyCard2 from "../ui/vo/property-card2";
import BigProperyCard from "../ui/vo/Big-propery-card";
import Navbar from "../ui/vo/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllProperties } from "@/store/property/action";

const Search = () => {
  const Property = useSelector((store) => store.property);

  console.log("PROPEprty", Property.property);
  return (
    <div className="font-jakarta">
      <Navbar />
      <PropertySearch />
      <section className="bg-gradient-to-b from-white to-bg-light_gray h-full mx-auto max-md:mx-2 max-w-6xl space-y-7 pb-10 lg:pb-16">
        {/*<SmallPropertyCard />*/}
        <BigProperyCard />
        <section className=" grid lg:grid-cols-5 ">
          <div className="space-y-7 col-span-4 pl-6 ">
            {Property?.property?.map((property) => (
              <PropertyCard2 key={property?.id} property={property} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Search;
{
  /**1
1. FIX going back to search probably have to take getallprops up to here,
2.Fix the selecting and unselecting of type and proptype,
3.Make sure state values for search remain after refresh (get values from urlparam)
4.
  */
}
