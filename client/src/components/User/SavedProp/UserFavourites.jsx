import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserSavedProperties } from "@/store/user/action";
import { Button } from "@/components/UI/ShadCN/button";
import { useNavigate } from "react-router-dom";
import PropertyCard from "@/components/UI/property-card";

const UserFavourites = () => {
  const dispatch = useDispatch();
  const userSavedProperties = useSelector((state) => state.user.savedProperty);
  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserSavedProperties());
  }, [dispatch]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  // Calculate the index range for slicing
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;

  // Slice the properties array to display only the current page's properties
  const currentProperties = userSavedProperties?.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(
    (userSavedProperties?.length || 0) / propertiesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const navigate = useNavigate;

  return (
    <div className="container mx-auto px-4 lg:px-6   pt-4 lg:pt-6 pb-8  bg-estate-50 dark:bg-[#121212] h-screen">
      <div
        className="flex max-md:flex-col justify-between items-center
            w-full mb-6 md:mb-10 gap-y-4 "
      >
        <div className="flex flex-col justify-between items-center md:items-start   w-full gap-y-1 ">
          {" "}
          <h1 className="text-3xl md:text-4xl font-bold text-text  dark:text-[#F8FDFF]">
            Saved Properties
          </h1>
          <p className="max-md:text-sm text-muted-foreground">
            Your favorite real estate listings in one place
          </p>
        </div>
        <Button
          className="max-md:h-9   text-white font-medium tracking-wide"
          onClick={() => {
            navigate("/user/property/create");
          }}
        >
          + Add New Property
        </Button>
      </div>
      <section className=" grid  xl:grid-cols-2 gap-x-6  gap-y-7 place-content-center ">
        {userSavedProperties?.map((savedProperty) => (
          <PropertyCard
            key={savedProperty?.id}
            property={savedProperty}
            saved={true}
            className={"dark:border-white/10 dark:border"}
          />
        ))}
      </section>
      {userSavedProperties?.length > propertiesPerPage && (
        <div className="flex justify-center mt-12 md:mt-20 mb-4 items-center">
          <Button
            className="mr-4 px-5 bg-gray-300 text-gray-800 hover:bg-gray-300"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <p className=" font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            className="ml-4 px-8"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserFavourites;
