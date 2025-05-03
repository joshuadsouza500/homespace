import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/ShadCN/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/UI/ShadCN/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/ShadCN/select";
import { MotionHeading, MotionText } from "@/components/UI/Animation/Motion";
import { motion } from "motion/react";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      subject: value,
    }));
  };
  /*   const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Message Sent! We've received your message and will get back to you soon."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 15000);
  }; */
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // Fade out and slide up on exit
      transition={{ duration: 0.5 }}
      className=" px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto py-4 md:py-8 font-jakarta "
    >
      {/* Header Section */}
      <div className="justify-center flex flex-col items-center  mb-12 gap-y-2">
        <MotionHeading text={`Contact Us`} className="text-4xl md:text-5xl " />

        <MotionText
          className=" max-w-xl mx-auto  text-center"
          text={`Have questions about buying, selling, or renting properties? Our team
          of experts is here to help you every step of the way.`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Information */}
        <div className="space-y-8 lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription className="tracking-wide">
                Our team is here to help you
              </CardDescription>
            </CardHeader>
            <CardContent className="md:grid grid-cols-2 lg:grid-cols-1 space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-Primary" />
                <div>
                  <h3 className="font-medium dark:text-[#F8FDFF]">Phone</h3>
                  <p className="text-muted-foreground">(+973) 34367282</p>
                  <p className="text-sm text-muted-foreground">
                    Sun-Thrs, 9am-5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-Primary" />
                <div>
                  <h3 className="font-medium dark:text-[#F8FDFF]">Email</h3>
                  <p className="text-muted-foreground">info@homespace.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-Primary" />
                <div>
                  <h3 className="font-medium dark:text-[#F8FDFF]">
                    Main Office
                  </h3>
                  <p className="text-muted-foreground">123 Jabbir Avn</p>
                  <p className="text-muted-foreground">
                    2nd Floor, StarPrize Towers{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 text-Primary" />
                <div>
                  <h3 className="font-medium dark:text-[#F8FDFF]">
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Sunday-Thursday:{" "}
                    <span className="font-semibold">9am-5pm</span>
                  </p>

                  <p className="text-muted-foreground">
                    Friday-Saturday:{" "}
                    <span className="text-red-600 black ">Closed</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
              <CardDescription className="tracking-wide">
                Stay connected on social media
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Link
                  href="#"
                  className="p-2 rounded hover:bg-muted transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"
                    className="size-6 xl:size-8"
                  />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded hover:bg-muted transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
                    className="size-6 xl:size-7"
                  />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded hover:bg-muted transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/behance/behance-original.svg"
                    className="size-6 xl:size-8"
                  />

                  <span className="sr-only">Behance</span>
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded hover:bg-muted transition-colors"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
                    className="size-6 xl:size-8"
                  />

                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription className="tracking-wide pb-1 pt-1">
              {` Fill out the form below and we'll get back to you as soon as
              possible.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-1 block w-full rounded-md border border-gray-300   focus:border-bborder sm:text-sm px-4 py-3 dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground ">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="mt-1 block w-full rounded-md border border-gray-300   focus:border-bborder sm:text-sm px-4 py-3 dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground ">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+973 123-4567"
                    className="mt-1 block w-full rounded-md border border-gray-300   focus:border-bborder sm:text-sm px-4 py-3 dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground ">
                    Subject
                  </label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="mt-1  w-full rounded-md border border-gray-300   focus:border-bborder sm:text-sm px-4  h-11 dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]">
                      <SelectValue
                        placeholder="Select a subject"
                        className="text-muted-foreground "
                      />
                    </SelectTrigger>
                    <SelectContent className="dark:text-muted-foreground ">
                      <SelectItem value="buying">Buying a Property</SelectItem>
                      <SelectItem value="selling">
                        Selling a Property
                      </SelectItem>
                      <SelectItem value="renting">
                        Renting a Property
                      </SelectItem>
                      <SelectItem value="valuation">
                        Property Valuation
                      </SelectItem>
                      <SelectItem value="other">Other Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-muted-foreground ">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your inquiry..."
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-bborder p-2 sm:text-sm min-h-[120px] dark:bg-[#121212] dark:border-[#49494b] [#4D4D4E]"
                />
              </div>
              <div className="w-full flex justify-center py-2">
                <Button
                  type="submit"
                  className="px-8 bg-Primary hover:bg-indigo-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center dark:text-[#F8FDFF]">
          Find Us
        </h2>
        {/**/}{" "}
        <div className="relative w-full md:w-[90%] mx-auto h-[400px] rounded-lg overflow-hidden border shadow">
          <iframe
            title="Location"
            width="100%"
            height="100%"
            className=" rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.2596831892297!2d-87.6244212!3d41.8867074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca3e2d9b6ef%3A0x4a79c2133bce7648!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
            loading="lazy"
            tabIndex="-1" // Prevents auto-focus
          />
        </div>
      </div>
    </motion.section>
  );
}
