import PropertySearch from "../PropertySearch";

import PropertyCard2 from "../ui/vo/property-card2";
import BigProperyCard from "../ui/vo/Big-propery-card";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProperties } from "@/store/property/action";
import { useLocation } from "react-router-dom";

const Search = () => {
  const Property = useSelector((store) => store.property);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const updatedUrlParams = params.toString();
    dispatch(getAllProperties(updatedUrlParams));
    console.log("updatedUrlParams", updatedUrlParams);
  }, [location.search, dispatch]);

  return (
    <div className="font-jakarta px-2  md:px-6 max-w-6xl 2xl:max-w-7xl mx-auto">
      <PropertySearch />
      <section className="bg-gradient-to-b from-white to-bg-light_gray h-full mx-auto  md:space-y-7 space-y-2 pb-10 lg:pb-16">
        {Property?.properties?.length > 0 && (
          <>
            {(() => {
              const randomIndex = Math.floor(
                Math.random() * Property.properties.length
              );
              const randomProperty = Property.properties[randomIndex];

              // Filter out the random property from the original array
              const remainingProperties = Property.properties.filter(
                (property) => property.id !== randomProperty.id
              );

              return (
                <>
                  <BigProperyCard
                    key={randomProperty?.id}
                    property={randomProperty}
                  />

                  <section className="grid lg:grid-cols-5">
                    <div className="space-y-7 col-span-4 md:pl-6 mx-auto px-1">
                      {remainingProperties.map((property) => (
                        <PropertyCard2 key={property?.id} property={property} />
                      ))}
                    </div>
                  </section>
                </>
              );
            })()}
          </>
        )}
      </section>
    </div>
  );
};

export default Search;
{
  /**1
1.
2.Fix the selecting and unselecting of type and proptype,
3.Make sure state values for search remain after refresh (get values from urlparam)

  */
}

{
  /*
  penthosue
  https://ap.rdcpix.com/d20388f2f2be6b28556902d5cc58cbc1l-m1363578766rd-w960_h720.webp,
  https://ap.rdcpix.com/d20388f2f2be6b28556902d5cc58cbc1l-m2172485182rd-w1280_h960.webp,https://ap.rdcpix.com/d20388f2f2be6b28556902d5cc58cbc1l-m389689759rd-w1280_h960.webp, 
  */
}
