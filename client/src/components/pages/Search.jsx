import PropertySearch from "../PropertySearch";

import PropertyCard2 from "../ui/vo/property-card2";
import BigProperyCard from "../ui/vo/Big-propery-card";
import Navbar from "../ui/vo/Navbar";
import { useSelector } from "react-redux";

const Search = () => {
  const Property = useSelector((store) => store.property);

  return (
    <div className="font-jakarta px-2  md:px-6 max-w-6xl 2xl:max-w-7xl mx-auto">
      <PropertySearch />
      <section className="bg-gradient-to-b from-white to-bg-light_gray h-full mx-auto  md:space-y-7 space-y-2 pb-10 lg:pb-16">
        {/*<SmallPropertyCard />*/}
        <BigProperyCard />
        <section className=" grid bg- lg:grid-cols-5 ">
          <div className="space-y-7 col-span-4 md:pl-6 mx-auto px-1 ">
            {Property?.properties?.map((property) => (
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
