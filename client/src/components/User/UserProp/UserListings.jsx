import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { getUserProperties } from "@/store/user/action";
import { Button } from "@/components/UI/ShadCN/button";
import { useNavigate } from "react-router-dom";
import PropertyCard from "@/components/UI/property-card";
import SkeletonLoader from "@/components/UI/SkeletonLoader";

const UserListings = () => {
  const dispatch = useDispatch();
  const userPropertyState = useSelector((state) => state.user);

  const userProperties = userPropertyState?.property;
  const isLoading = userPropertyState?.isLoading;

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  // Calculate the index range for slicing
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;

  // Slice the properties array to display only the current page's properties
  const currentProperties = userProperties?.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(
    (userProperties?.length || 0) / propertiesPerPage
  );

  // Use useEffect to fetch user properties when the component mounts
  useEffect(() => {
    dispatch(getUserProperties());
  }, [dispatch]);

  const navigate = useNavigate();

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

  return (
    <div className="container mx-auto px-4 lg:px-6 pt-4 lg:pt-6 pb-8 bg-estate-50">
      <div
        className="flex max-md:flex-col justify-between items-center
      w-full mb-10 gap-y-4 "
      >
        <h1 className="text-3xl md:text-4xl font-bold text-estate-800 dark:text-white">
          My Properties
        </h1>
        <Button
          className="max-md:h-9 bg-Primary text-white font-medium tracking-wide hover:bg-purple-700"
          onClick={() => {
            navigate("/user/property/create");
          }}
        >
          + Add New Property
        </Button>
      </div>

      <section className="grid xl:grid-cols-2 gap-x-6 gap-y-7 place-content-center">
        {/* Check if there are properties and map through them */}
        {isLoading == false ? (
          currentProperties && currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <PropertyCard
                key={property.id}
                update={true}
                property={property}
                className="md:max-w-2xl mx-1 md:h-64 2xl:g-64 backdrop-blur-md bg-white/70 dark:bg-black/40 border-black/5 dark:border-white/10 border"
              />
            ))
          ) : (
            <p className="text-center xl:text-end w-full text-2xl font-medium">
              No Properties Listed By User!
            </p>
          )
        ) : (
          <SkeletonLoader />
        )}
      </section>

      {/* Pagination Controls */}
      {userProperties?.length > propertiesPerPage && (
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

export default UserListings;
