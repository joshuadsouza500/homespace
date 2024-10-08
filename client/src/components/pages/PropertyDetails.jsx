import PropertyDetails2 from "../ui/vo/property-details2";
import PropertyDetails1 from "../ui/vo/property-details1";
import Navbar from "../ui/vo/Navbar";
const PropertyDetails = () => {
  return (
    <div className="max-w-6xl bg-gradient-b from-white to-light_gray mx-auto">
      <Navbar />
      <PropertyDetails2 />
      <section className="bg-Bgpurple h-96">
        <h1 className="text-4xl font-bold text-center py-6 text-white">
          Browse similar Properties
        </h1>
      </section>
    </div>
  );
};

export default PropertyDetails;
