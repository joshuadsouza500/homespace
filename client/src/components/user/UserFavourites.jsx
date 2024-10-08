import PropertyCard2 from "../ui/vo/property-card2";

const UserFavourites = () => {
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-text text-center">
        Saved Properties
      </h1>
      <section>
        <div className="space-y-7 col-span-4 lg:ml-10 sm:ml-6 ">
          <PropertyCard2 />
          <PropertyCard2 />
          <PropertyCard2 />
        </div>
      </section>
    </div>
  );
};

export default UserFavourites;
