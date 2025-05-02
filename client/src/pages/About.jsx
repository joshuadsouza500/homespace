import { Building2, Clock, Globe, Home, Users } from "lucide-react";
import { Card, CardContent } from "@/components/UI/ShadCN/card";
import CTA from "@/components/Homepage/CTA";
import { MotionHeading, MotionText } from "@/components/UI/Animation/Motion";
import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Fade out and slide up on exit
      transition={{ duration: 0.5 }} // Smooth transition
      className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto py-4 md:py-8 font-jakarta  bg-estat e-50"
    >
      {/* Hero Section */}

      <div className="justify-center flex flex-col items-center  mb-12 gap-y-2">
        <MotionHeading
          className="text-4xl md:text-5xl "
          text={`About HomeSpace`}
        />

        <MotionText
          className="max-md:max-w-sm  max-2xl:max-w-lg text-center  mx-auto "
          text={`Your trusted partner in finding the perfect property in the Kingdom of
          Bahrain`}
        />
      </div>

      {/* Our Story Section */}
      <section className="py-4 md:py-16 container mx-auto px-4 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 dark:text-[#F8FDFF]">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-muted-foreground mb-4">
              {`HomeSpace is a revolutionary property finder platform that has quickly made its mark in Bahrain's real estate landscape. Emerging as a solution to the common challenges faced by property seekers, we utilize cutting-edge technology and innovative features to streamline the home search process, connecting you with a curated selection of properties that match your needs.`}
            </p>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              {` At HomeSpace, we recognize that finding a home is about more than just a transaction; it's about discovering a place where cherished memories can be made and we are here to help you find the one that resonates with you.  `}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <div className="bg-[#7065f0]/10 p-3 rounded-full mr-4">
                  <Building2 className="h-6 w-6 text-Primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-[#F8FDFF]">
                    200+
                  </p>
                  <p className="text-sm text-gray-500">Properties Listed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#7065f0]/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-Primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-[#F8FDFF]">
                    1000+
                  </p>
                  <p className="text-sm text-gray-500">Happy Clients</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#7065f0]/10 p-3 rounded-full mr-4">
                  <Home className="h-6 w-6 text-Primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-[#F8FDFF]">
                    100+
                  </p>
                  <p className="text-sm text-gray-500">Successful Deals</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#7065f0]/10 rounded-lg"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#7065f0]/10 rounded-lg"></div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="/Team1.jpeg"
                alt="HomeSpace office"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className=" pt-16 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 dark:text-[#F8FDFF]">
              Our Mission & Vision
            </h2>
            <p className="max-md:text-sm max-w-lg mx-auto text-gray-600 dark:text-muted-foreground ">
              {`Guided by our core values, we're committed to transforming the
              real estate experience in Bahrain`}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 ">
            <Card className=" shadow-lg dark:border">
              <CardContent className="pt-6 ">
                <div className="bg-[#7065f0]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 max-md:mx-auto">
                  <Globe className="h-8 w-8 text-Primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-[F8FDFF] mb-4 max-md:text-center dark:text-[#F8FDFF]">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground  max-md:text-center">
                  Our mission is straightforward: to transform property
                  searching in Bahrain into a transparent, efficient, and
                  enjoyable experience.With HomeSpace, you can trust that your
                  journey toward your dream home is in capable hands.
                </p>
              </CardContent>
            </Card>
            <Card className=" shadow-lg  dark:border ">
              <CardContent className="pt-6 ">
                <div className="bg-[#7065f0]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 max-md:mx-auto">
                  <Clock className="h-8 w-8 text-Primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-[F8FDFF] mb-4 max-md:text-center dark:text-[#F8FDFF] ">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground max-md:text-center ">
                  To be the most trusted and innovative property platform in the
                  Middle East. We envision a future where finding your dream
                  property is just a few clicks away, regardless of your needs
                  or budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </motion.section>
  );
}
