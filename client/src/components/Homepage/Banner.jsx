const Banner = () => {
  return (
    <div className="relative w-full pb-10  px-2">
      <div className="relative w-[95%] md:w-[85%] mx-auto rounded-xl lg:rounded-3xl overflow-hidden">
        {/* Dark overlay filter */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10  to-black/0"></div>

        {/* Banner Image */}
        <img
          alt="banner img"
          src="/Banner2.jpeg"
          className="w-full h-[200px] sm:h-[250px]  lg:h-[340px] object-cover"
        />

        {/* Text and Button Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4  md:px-10 lg:px-12 text-white space-y-3 w-[60%] ">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#110229] tracking-wide max-sm:leading-tight lg:pb-1">
            Discover Your Perfect Space!
          </h2>
          <p className="text-[10px] md:text-lg font-normal sm:w-[80%] max-sm:mr-4  text-[#585981] lg:pb-3 pl-1">
            Check out our latest properties and start your journey today!
          </p>
          <button className="mt-3 px-2 py-1 max-sm:text-[10px] md:px-4 md:py-2 bg-Bgpurple hover:bg-text rounded-sm text-white font-semibold">
            Explore Listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
