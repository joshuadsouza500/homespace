import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "https://cdn-icons-png.flaticon.com/128/10643/10643275.png",
    role: "Home Buyer",
    quote:
      "Thanks to this website, I found my dream home in just a few weeks! The process was smooth and the agents were incredibly helpful.",
  },
  {
    name: "Michael Chen",
    avatar: "https://cdn-icons-png.flaticon.com/128/10643/10643273.png",
    role: "Property Seller",
    quote:
      "I was able to sell my property quickly and at a great price. The marketing tools provided were top-notch!",
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://cdn-icons-png.flaticon.com/128/10643/10643269.png",
    role: "Home Buyer",
    quote:
      "As a first-time homebuyer, I was nervous about the process. This platform made everything easy to understand and manage.",
  },
  {
    name: "David Thompson",
    avatar: "https://cdn-icons-png.flaticon.com/128/10643/10643283.png",
    role: "Property Seller",
    quote:
      "The exposure my property got through this website was amazing. I received multiple offers within days!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full pt-12 pb-28 bg-gradient-to-b from-inherit to-light_gray">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-3 items-center mt-8 mb-12  ">
          <h2 className="text-4xl font-bold text-[#000929]">
            What Our Clients Say
          </h2>
          <p className=" max-sm:text-sm  w-[40%] text-center text-[#4d5461] pb-3">
            Hear from happy buyers and sellers {"who've"} achieved their real
            estate goals with us.
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <Card className="bg-white border-[#e0def7] shadow-sm">
            <CardContent className="p-6">
              <QuoteIcon className="h-8 w-8 text-[#e0def7] mb-4 mx-auto" />
              <p className="text-gray-700 mb-4 text-center text-lg">
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
                  <p className="font-semibold text-[#000929]">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-3">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 rounded-full mx-1 p-0 ${
                index === currentIndex ? "bg-[#000929]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to testimonial {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

{
  /**const nextTestimonial = () => {
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
