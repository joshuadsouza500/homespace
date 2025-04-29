const Slider = () => {
  return (
    <section className=" py-10  bg-white dark:bg-[#121212]">
      <div className="  px-2   w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto space-y-4 md:space-y-6">
        <div>
          <h3 className="text-center font-medium max-sm:w-[70%] text-text mx-auto md:text-xl ">
            Trusted by some of the leading companies in the region
          </h3>
        </div>
        {/* 
        
        */}
        <div className="relative ">
          {/* Blur effect on the left */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white-50 to-transparent pointer-events-none z-10"></div>

          {/* Blur effect on the right */}
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white-50 to-transparent pointer-events-none z-10"></div>
          <div className="flex overflow-hidden gap-x-16 group xl:gap-x-20 ">
            {/**animate-loop-scroll */}
            <div className="flex w-full gap-x-12 md:gap-x-16 xl:gap-x-20 items-center group-hover:paused   justify-around animate-loop-scroll">
              <img
                src="./Logo1.png"
                alt="company logo"
                className="size-20 max-w-none md:size-24   object-cover"
              />
              <img
                src="https://www.svgrepo.com/show/303626/mary-kay-2-logo.svg"
                alt="company logo"
                className="size-20 max-w-none md:size-24 hidden md:block bg-estate-50 dark:hidden"
              />

              <img
                src="https://www.svgrepo.com/show/303347/bookingcom-logo.svg"
                alt="company logo"
                className="size-20 max-w-none md:size-24 "
              />
              <img
                src="./client_5.png"
                alt="company logo"
                className="size-14 max-w-none md:size-12 "
              />

              <img
                src="https://www.svgrepo.com/show/303537/ziggo-logo.svg"
                alt="company logo"
                className="size-14 max-w-none md:size-20 "
              />
              <img
                src="https://www.svgrepo.com/show/303323/cisco-2-logo.svg"
                alt="company logo"
                className="size-14 max-w-none md:size-20 "
              />

              <img
                src="./Logo2.png"
                alt="company logo"
                className="size-14 max-w-none md:size-24  hidden sm:block"
              />
              <img
                src="https://www.svgrepo.com/show/303537/ziggo-logo.svg"
                alt="company logo"
                className="size-14 max-w-none md:size-20 hidden dark:md:block "
              />
            </div>
            <div
              /**animate-loop-scroll */
              className="flex w-full gap-x-12 md:gap-x-16 xl:gap-x-20 items-center    justify-around group-hover:paused animate-loop-scroll"
              aria-hidden="true"
            >
              <img
                src="./Logo1.png"
                alt="company logo"
                className="size-20 max-w-none md:size-24   object-cover hidden md:block"
              />
              <img
                src="https://www.svgrepo.com/show/303626/mary-kay-2-logo.svg"
                alt="company logo"
                className="size-20 max-w-none md:size-24  dark:hidden"
              />

              <img
                src="https://www.svgrepo.com/show/303347/bookingcom-logo.svg"
                alt="company logo"
                className="size-20 max-w-none md:size-24 hidden sm:block"
              />
              <img
                src="./client_5.png"
                alt="company logo"
                className="size-14 max-w-none md:size-20"
              />

              <img
                src="https://www.svgrepo.com/show/303537/ziggo-logo.svg"
                alt="company logo"
                className="size-14 max-w-none md:size-20 "
              />
              <img
                src="https://www.svgrepo.com/show/303323/cisco-2-logo.svg"
                alt="company logo"
                className="size-14 max-w-none md:size-20 "
              />

              <img
                src="./Logo2.png"
                alt="company logo"
                className="size-14 max-w-none md:size-24  hidden sm:block"
              />
              <img
                src="https://www.svgrepo.com/show/303537/ziggo-logo.svg"
                alt="company logo"
                className="size-14 max-w-none md:size-20 hidden dark:md:block "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
