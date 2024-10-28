import { useDispatch, useSelector } from "react-redux";
import PropertyCard2 from "../ui/vo/property-card2";
import { useEffect } from "react";
import { getUserSavedProperties } from "@/store/user/action";

const UserFavourites = () => {
  const dispatch = useDispatch();
  const userSavedProperties = useSelector((state) => state.user.savedProperty);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserSavedProperties());
  }, [dispatch]);
  console.log("user's saved prop", userSavedProperties);
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-text text-center">
        Saved Properties
      </h1>
      <section>
        <div className="space-y-7 col-span-4 lg:ml-10 sm:ml-6 ">
          {userSavedProperties?.map((savedProperty) => (
            <PropertyCard2 key={savedProperty?.id} property={savedProperty} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserFavourites;
