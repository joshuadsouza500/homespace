const Slider = () => {
  return (
    <section className=" py-10 space-y-4 md:space-y-6 ">
      <div>
        <h3 className="text-center font-semibold max-sm:w-[70%] text-text mx-auto md:text-xl ">
          Trusted by some of the leading companies in the region
        </h3>
      </div>
      <div className="flex overflow-hidden gap-x-16 group">
        {/**animate-loop-scroll */}
        <div className="flex w-full gap-x-12 md:gap-x-16 items-center group-hover:paused   justify-around animate-loop-scroll">
          <img
            src="data:image/jpeg;base64,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"
            alt="company logo"
            className="size-20 max-w-none md:size-24   object-cover"
          />
          <img
            src="https://www.svgrepo.com/show/303626/mary-kay-2-logo.svg"
            alt="company logo"
            className="size-20 max-w-none md:size-24 hidden md:block "
          />

          <img
            src="https://www.svgrepo.com/show/303347/bookingcom-logo.svg"
            alt="company logo"
            className="size-20 max-w-none md:size-24 "
          />
          <img
            src="https://www.svgrepo.com/show/303412/tunein-logo.svg"
            alt="company logo"
            className="size-14 max-w-none md:size-20 "
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
            src="https://www.svgrepo.com/show/303428/dom-perignon-1-logo.svg"
            alt="company logo"
            className="size-14 max-w-none md:size-20  hidden md:block"
          />
        </div>
        <div
          /**animate-loop-scroll */
          className="flex w-full gap-x-12 md:gap-x-16 items-center    justify-around group-hover:paused animate-loop-scroll"
          aria-hidden="true"
        >
          <img
            src="data:image/jpeg;base64,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"
            alt="company logo"
            className="size-20 max-w-none md:size-24   object-cover hidden md:block"
          />
          <img
            src="https://www.svgrepo.com/show/303626/mary-kay-2-logo.svg"
            alt="company logo"
            className="size-20 max-w-none md:size-24 "
          />

          <img
            src="https://www.svgrepo.com/show/303347/bookingcom-logo.svg"
            alt="company logo"
            className="size-20 max-w-none md:size-24 "
          />
          <img
            src="https://www.svgrepo.com/show/303412/tunein-logo.svg"
            alt="company logo"
            className="size-14 max-w-none md:size-20 "
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
            src="https://www.svgrepo.com/show/303428/dom-perignon-1-logo.svg"
            alt="company logo"
            className="size-14 max-w-none md:size-20  hidden md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Slider;
