import { Building2, Clock, Globe, Home, Users } from "lucide-react";
import { Card, CardContent } from "@/components/UI/ShadCN/card";
import CTA from "@/components/Homepage/CTA";

export default function AboutPage() {
  return (
    <section className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto py-4 md:py-8 font-jakarta ">
      {/* Hero Section */}

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About HomeSpace</h1>
        <p className="text-muted-foreground max-2xl:max-w-xl  mx-auto tracking-wide ">
          Your trusted partner in finding the perfect property in the Kingdom of
          Bahrain
        </p>
      </div>

      {/* Our Story Section */}
      <section className="py-16 container mx-auto px-4 ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              {`HomeSpace is a revolutionary property finder platform that has quickly made its mark in Bahrain's real estate landscape. Emerging as a solution to the common challenges faced by property seekers, we utilize cutting-edge technology and innovative features to streamline the home search process, connecting you with a curated selection of properties that match your needs.`}
            </p>
            <p className="text-gray-600 mb-6">
              {` At HomeSpace, we recognize that finding a home is about more than just a transaction; it's about discovering a place where cherished memories can be made and we are here to help you find the one that resonates with you.  `}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <div className="bg-[#7065f0]/10 p-3 rounded-full mr-4">
                  <Building2 className="h-6 w-6 text-[#7065f0]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">200+</p>
                  <p className="text-sm text-gray-500">Properties Listed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#7065f0]/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-[#7065f0]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">1000+</p>
                  <p className="text-sm text-gray-500">Happy Clients</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#7065f0]/10 p-3 rounded-full mr-4">
                  <Home className="h-6 w-6 text-[#7065f0]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">100+</p>
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
                src="/HouseF.jpeg"
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Our Mission & Vision
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              {`      Guided by our core values, we're committed to transforming the
              real estate experience in Bahrain`}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-[#7065f0]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-[#7065f0]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  Our mission is straightforward: to transform property
                  searching in Bahrain into a transparent, efficient, and
                  enjoyable experience.With HomeSpace, you can trust that your
                  journey toward your dream home is in capable hands.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-[#7065f0]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-[#7065f0]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600">
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
    </section>
  );
}
