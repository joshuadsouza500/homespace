import { useDispatch, useSelector } from "react-redux";
import PropertyCard2 from "../ui/vo/property-card2";
import { useEffect } from "react";
import { getUserProperties } from "@/store/user/action";

const UserListings = () => {
  const dispatch = useDispatch();
  const userProperties = useSelector((state) => state.user.property);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserProperties());
  }, [dispatch]);
  console.log("client prop", userProperties);
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-text text-center">
        My Properties
      </h1>
      <section>
        <div className="space-y-7 col-span-4 lg:ml-10 sm:ml-6">
          {/* Check if there are properties and map through them */}
          {userProperties && userProperties.length > 0 ? (
            userProperties.map((property) => (
              <PropertyCard2
                key={property.id}
                update={true}
                property={property}
                className="hover:shadow-none"
              />
            ))
          ) : (
            <p className="text-center">No properties found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserListings;
