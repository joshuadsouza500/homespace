import PropertyCard2 from "../ui/vo/property-card2";

const UserListings = () => {
  const update = true;
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-text text-center">
        My Properties
      </h1>
      <section>
        <div className="space-y-7 col-span-4 lg:ml-10 sm:ml-6 ">
          <PropertyCard2 update={update} className="hover:shadow-none" />
          <PropertyCard2 update={update} />
          <PropertyCard2 update={update} />
        </div>
      </section>
    </div>
  );
};

export default UserListings;
