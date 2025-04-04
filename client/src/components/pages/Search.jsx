import PropertySearch from "../PropertySearch";

import PropertyCard2 from "../ui/vo/property-card2";
import BigProperyCard from "../ui/vo/Big-propery-card";

import { useSelector } from "react-redux";
import { Bookmark, Clock, MapPinCheck, SearchCheck } from "lucide-react";

import { Link } from "react-router-dom";

const Search = () => {
  const Property = useSelector((store) => store.property);

  return (
    <div className="font-jakarta bg-estate-50">
      <div className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto bg-white shadow-lg ">
        <PropertySearch />
        <section className="h-full mx-auto  md:space-y-7 space-y-2 pb-10 lg:pb-16 pt-1">
          {Property?.properties?.length > 0 ? (
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
                    <div className="ml-2 xl:ml-10">
                      {" "}
                      <BigProperyCard
                        key={randomProperty?.id}
                        property={randomProperty}
                      />
                    </div>

                    <section className="grid lg:grid-cols-4  max-w-6xl mx-auto 2xl:max-w-7xl">
                      <div className="space-y-7 col-span-3 md:pl-2 2xl:pl-6  max-lg:mx-auto px-1  ">
                        {remainingProperties.map((property) => (
                          <PropertyCard2
                            key={property?.id}
                            property={property}
                          />
                        ))}
                      </div>
                      {/* Popular Seaches box */}{" "}
                      {/* Right now its mt-72 but after adding pagination making it self-center */}
                      {/* Only display it if there are multiple properties displayed */}
                      <div
                        className={`items-start justify-center bg-white backdrop-blur-lg shadow-xl border-[0.5px] rounded-md max-w-72 max-h-72  col-span-1 p-3  flex flex-col gap-y-4 cursor-pointer transition-all duration-300 mt-72 self- center ${
                          Property?.properties?.length > 2 ? "block" : "hidden"
                        }`}
                      >
                        {" "}
                        <span>
                          {" "}
                          <h2 className="text-lg font-semibold text-text flex items-center">
                            <SearchCheck className="mr-2.5 text-Primary" />{" "}
                            Popular Searches
                          </h2>
                          <ul className="mt-2 ml-8 space-y-2 text-gray-600  text-sm">
                            <li className="hover:text-Primary">
                              Apartments in Hamad Town
                            </li>
                            <li className="hover:text-Primary">
                              Studio in Jufffair
                            </li>
                            <li className="hover:text-Primary">
                              Luxury Condo in Manama
                            </li>
                          </ul>
                        </span>
                        <span>
                          {" "}
                          <h2 className="text-lg font-semibold text-text flex items-center hover:text-Primary">
                            <MapPinCheck className="mr-2.5 text-Primary" />{" "}
                            Nearby Areas
                          </h2>
                          <ul className="mt-2 ml-8 space-y-2 text-gray-600  text-sm">
                            <li className="hover:text-Primary">
                              Apartments for rent in Manama
                            </li>
                            <li className="hover:text-Primary">
                              Villas for sale in Seef
                            </li>
                          </ul>
                        </span>
                        <button className="text-lg font-semibold text-text  hover:text-Primary">
                          <Link
                            to="/user/property/saved"
                            className="flex items-center"
                          >
                            <Bookmark className="mr-2.5 text-Primary " /> Saved
                            Properties
                          </Link>
                        </button>
                      </div>
                    </section>
                  </>
                );
              })()}
            </>
          ) : (
            <div className="flex items-start mt-10 md:mt-20 justify-center min-h-screen ">
              <div className="text-center p-6 bg-Bgpurple rounded-lg shadow-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-estate-100">
                  Oops! Something went wrong.
                </h1>
                <p className="mt-4 text-gray-100">{`We couldn't find the properties you were looking for .`}</p>
                <button className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Try Again
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Search;
{
  /**1 Change the height of the other cards especially md to lg
1.
2.Fix the selecting and unselecting of type and proptype,
3.Make sure state values for search remain after refresh (get values from urlparam)
4.Onces a city has been selected after removing it it still remains in the query

  */
}

{
  /*
  penthosue
  https://ap.rdcpix.com/d20388f2f2be6b28556902d5cc58cbc1l-m1363578766rd-w960_h720.webp,
  https://ap.rdcpix.com/d20388f2f2be6b28556902d5cc58cbc1l-m2172485182rd-w1280_h960.webp,https://ap.rdcpix.com/d20388f2f2be6b28556902d5cc58cbc1l-m389689759rd-w1280_h960.webp, 
  */
}
