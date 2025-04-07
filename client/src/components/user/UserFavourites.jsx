import { useDispatch, useSelector } from "react-redux";
import PropertyCard2 from "../ui/vo/property-card2";
import { useEffect } from "react";
import { getUserSavedProperties } from "@/store/user/action";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UserFavourites = () => {
  const dispatch = useDispatch();
  const userSavedProperties = useSelector((state) => state.user.savedProperty);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserSavedProperties());
  }, [dispatch]);

  const navigate = useNavigate;
  //console.log("user's saved prop", userSavedProperties);
  return (
    <div className="container mx-auto px-4 lg:px-8 pt-4 lg:pt-6 pb-8 ">
      <div
        className="flex max-md:flex-col justify-between items-center
            w-full mb-6 md:mb-10 gap-y-4 "
      >
        <div className="flex flex-col justify-between items-center md:items-start   w-full gap-y-1 ">
          {" "}
          <h1 className="text-3xl md:text-4xl font-bold text-text ">
            Saved Properties
          </h1>
          <p className="max-md:text-sm text-muted-foreground">
            Your favorite real estate listings in one place
          </p>
        </div>
        <Button
          className="max-md:h-9 bg-Primary  text-white font-medium tracking-wide hover:bg-purple-700 "
          onClick={() => {
            navigate("/user/property/create");
          }}
        >
          + Add New Property
        </Button>
      </div>
      <section className=" grid  xl:grid-cols-2 gap-x-6 gap-y-7 place-content-center ">
        {userSavedProperties?.map((savedProperty) => (
          <PropertyCard2 key={savedProperty?.id} property={savedProperty} />
        ))}
      </section>
    </div>
  );
};

export default UserFavourites;
