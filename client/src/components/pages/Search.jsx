import PropertySearch from "../PropertySearch";

import PropertyCard2 from "../ui/vo/property-card2";
import BigProperyCard from "../ui/vo/Big-propery-card";
import Navbar from "../ui/vo/Navbar";

const Search = () => {
  return (
    <div className="font-jakarta">
      <Navbar />
      <PropertySearch />
      <section className="bg-gradient-to-b from-white to-bg-light_gray h-full mx-auto max-md:mx-2 max-w-6xl space-y-7 ">
        {/*<SmallPropertyCard />*/}
        <BigProperyCard />
        <section className=" grid lg:grid-cols-5 ">
          <div className="space-y-7 col-span-4 pl-6 ">
            <PropertyCard2 />
            <PropertyCard2 />
            <PropertyCard2 />
          </div>
          <div className="hidden  col-span-1 mt-[300px]">
            <p className="font-bold text-lg">Popular Seaches</p>
            <ol className="text-sm font-semibold list-disc  cursor-pointer ml-1">
              <li className="hover:underline">Properties near Awali</li>
              <li className="hover:underline">Properties near Jhds</li>
              <li className="hover:underline">Properties near Riffa</li>
              <li className="hover:underline">Properties near Sitra</li>
              <li className="hover:underline">Properties near mksadnfj</li>
              <li className="hover:underline">Properties near thw</li>
            </ol>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Search;
