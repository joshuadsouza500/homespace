import { useDispatch, useSelector } from "react-redux";
import PropertyCard2 from "../ui/vo/property-card2";
import { useEffect } from "react";
import { getUserProperties } from "@/store/user/action";
import UserPropertyDisplay from "../ui/vo/UserPropertyDisplay";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const UserListings = () => {
  const dispatch = useDispatch();
  const userProperties = useSelector((state) => state.user.property);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserProperties());
  }, [dispatch]);
  // console.log("client prop", userProperties);
  return (
    <div className="container mx-auto px-4 lg:px-8 pt-4 lg:pt-6 pb-8  bg-estate-50">
      <div
        className="flex max-md:flex-col justify-between items-center
      w-full mb-6 xl:mb-10 gap-y-4 "
      >
        {" "}
        <h1 className="text-3xl md:text-3xl 2xl:text-4xl   font-bold text-estate-800 dark:text-white ">
          My Properties
        </h1>
        <Button className="max-md:h-9 bg-Primary  text-white font-medium tracking-wide hover:bg-purple-700 ">
          + Add New Property
        </Button>
      </div>
      <div className="hidden md:block mb-8">
        <p className="text-xs font-medium text-gray-500 uppercase mb-2">
          Quick FILTERS
        </p>
        <div className="flex space-x-2">
          <button
            className={cn(
              "chat-filter-button rounded-full text-sm px-5 py-1.5 font-medium transition-all bg-light_gray chat-gray text-gray-700 hover:bg-gray-200" //filter === "all" && "active"
            )}
            // onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={cn(
              "chat-filter-button rounded-full text-sm px-4 py-1.5 font-medium transition-all bg-light_gray chat-gray text-gray-700 hover:bg-gray-200l"
              //  filter === "unread" && "active"
            )}
            //onClick={() => setFilter("unread")}
          >
            Listed{" "}
          </button>
          <button
            className={cn(
              "chat-filter-button rounded-full text-sm px-4 py-1.5 font-medium transition-all bg-light_gray chat-gray text-gray-700 hover:bg-gray-200l"
              //  filter === "unread" && "active"
            )}
            //onClick={() => setFilter("unread")}
          >
            Unlisted{" "}
          </button>
        </div>
      </div>

      <section className=" grid  xl:grid-cols-2 gap-x-6 gap-y-7 place-content-center  ">
        {/* Check if there are properties and map through them */}
        {userProperties && userProperties.length > 0 ? (
          userProperties.map((property) => (
            <UserPropertyDisplay
              key={property.id}
              update={true}
              property={property}
              className="hover:shadow-none"
            />
          ))
        ) : (
          <p className="text-center">No properties found.</p>
        )}
      </section>
    </div>
  );
};

export default UserListings;
