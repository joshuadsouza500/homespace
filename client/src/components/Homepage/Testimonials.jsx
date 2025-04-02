import { useEffect, useState } from "react";

import { Quote, Star } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Wang",
    avatar: "/people/PersonF.svg",
    role: "Home Buyer",
    quote:
      "Thanks to HomeSpace, I found my dream home in just a few weeks! The process was smooth and the agents were incredibly helpful.",
  },
  {
    name: "Rami Houssain",
    avatar:
      "https://img.freepik.com/free-photo/close-up-bearded-tired-man_176420-18785.jpg?ga=GA1.1.232563297.1691509462&semt=ais_hybrid",
    role: "Property Seller",
    quote:
      "I was able to sell my property quickly and at a great price! sold my property quickly and at a great price",
  },
  {
    name: "Mark Anderson",
    avatar: "/people/PersonB.svg",
    role: "Property Seller",
    quote:
      "The exposure my property got through HomeSpace was amazing. I received multiple offers within days! ",
  },
  {
    name: "Sara Rodriguez",
    avatar: "/people/PersonH.svg",
    role: "Home Buyer",
    quote:
      "As a first-time homebuyer, I was nervous about the process. This platform made everything easy to understand !",
  },
  {
    name: "David Thompson",
    avatar:
      "https://img.freepik.com/free-photo/worldface-british-guy-white-background_53876-14467.jpg?ga=GA1.1.232563297.1691509462&semt=ais_hybrid",
    role: "Property Seller",
    quote:
      "The exposure my property got through HomeSpace was amazing. I received multiple offers within days. Highly recommend!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState();
  const handleProfileClick = (index) => {
    if (api) {
      api.scrollTo(index);
      setCurrentIndex(index);
    }
  };
  const handleSelect = () => {
    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
    }
  };

  useEffect(() => {
    if (!api) return;

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  //background colour option 1 : bg-[#f7f6fc]

  return (
    <section className="w-full pt-12 md:pt-16 pb-20 md:pb-28 border-[#e0def7] bg- [#f7f6fc] px-2">
      <div className="container px-2 md:px-4">
        <div className="flex flex-col gap-3 items-center mt-8 mb-12  ">
          <h2 className="text-3xl md:text-4xl text-center pb-1  font-bold text-text">
            What Our Clients Say
          </h2>
          <p className=" max-sm:text-sm w-[90%] tracking-wide md:w-[50%] lg:w-[35%] text-center text-[#4d5461] pb-3">
            Hear from happy buyers and sellers {"who've"} achieved their real
            estate goals with us.
          </p>
        </div>
        <div>
          <Carousel
            opts={{
              align: "center", // Center-align the testimonials
              loop: true,
            }}
            setApi={setApi}
            className="w-full cursor-pointer"
          >
            <CarouselContent className="flex gap-x-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className=" relative basis-[75%] md:basis-1/2 lg:basis-1/3    overflow -hidden group mt-1"
                >
                  <div
                    className={` px-10 py-8 mb-8 rounded-lg text-center relative tracking-wide  ${
                      currentIndex === index
                        ? "bg-Primary scale-105 text-white shadow-lg "
                        : "opacity-40 scale-95 text-black"
                    }`}
                  >
                    <Quote className="size-7 fill-black text-black/0 opacity-20 rotate-180 fixed left-3 top-7" />
                    <p className="text-sm  2xl :text-base  font-medium leading-relaxed  text-pretty text-">
                      {testimonial.quote}
                    </p>
                    <span
                      className={`flex gap-x-2 items-center justify-center pt-4 ${
                        currentIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Star className="size-3 fill-white" />
                      <Star className="size-3 fill-white" />
                      <Star className="size-3 fill-white" />
                      <Star className="size-3 fill-white" />
                    </span>
                    <span
                      className={`  absolute left-[46%] right-[50%] -bottom-4  z-10 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[18px] border-transparent rotate-180 border-b-Primary ${
                        currentIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  </div>
                  {/* Triangle  */}

                  <div
                    className={` w-full font-semibold  flex items-center justify-center flex-col text-Bgpurple ${
                      currentIndex === index
                        ? " scale-105 "
                        : "opacity-50 scale-95 text-black"
                    }`}
                  >
                    <img
                      src={testimonial.avatar}
                      className="rounded-full size-12 bg-white border border-border object-cover"
                    />
                    <h3 className=" text-sm pt-1">{testimonial.name}</h3>
                    <p className="opacity-90 text-xs pt-0.5 text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pt-6 md:pt-8  flex items-center gap-3 justify-center  ">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => handleProfileClick(index)}
                className={`transition-all duration-300 h-1 w-6 bg-Primary ${
                  index === currentIndex
                    ? "opacity-100 scale-125 "
                    : "bg-gray-400 opacity-40 hover:opacity-75"
                }`}
              ></button>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center pt-10 lg:pt-16">
          <Link to="/property">
            <Button className="flex px-8 h-11 bg-indigo-700 rounded-lg hover:bg-Primary text-white text-sm tracking-wide font-semibold">
              View All
            </Button>
          </Link>
        </div>{" "}
      </div>
    </section>
  );
}

{
  /**
   * 
   * 
   * 
     <div className="relative max-w-2xl mx-auto">
          <Card className="bg-white border-[#e0def7] shadow-md">
            <CardContent className="p-4 md:p-6">
              <QuoteIcon className="size-5 md:size-8 text-[#e0def7] mb-4 mx-auto " />
              <p className="text-[#4d5461]  mb-4 text-center text-pretty max-md:tracking-wide text-base md:text-lg">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex items-center justify-center">
                <Avatar className="size-14 mr-2">
                  <AvatarImage
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                  />
                </Avatar>
                <div>
                  <p className="font-semibold text-text">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-black/60">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 rounded-full mx-1 p-0 ${
                index === currentIndex ? "bg-text" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to testimonial {index + 1}</span>
            </Button>
          ))}
        </div> * 
   
   
   
  
  
  
  
  
  
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div> */
}
