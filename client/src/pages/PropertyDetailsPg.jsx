import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAllProperties,
  getPropertyById,
  saveProperty,
} from "@/store/property/action";
import { useEffect } from "react";
import { Button } from "../components/UI/ShadCN/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/ShadCN/accordion";
import { ArrowRight } from "lucide-react";
import SimilarProps from "@/components/PropertyDetailsPage/SimilarProps";
import PropertyDetails from "@/components/PropertyDetailsPage/property-details";
import { MotionHeading, MotionText } from "@/components/UI/Animation/Motion";
import { motion } from "motion/react";
const faqs = [
  {
    question: "What documents are required for property purchase in Bahrain?",
    answer:
      "The required documents typically include a valid passport or CPR, proof of income, and a no-objection certificate from your employer.",
  },
  {
    question: "What are the annual property taxes in Bahrain?",
    answer:
      "Bahrain offers relatively low property taxes. There is a municipal tax of 10% of the annual rental value, which is typically included in utility bills.",
  },
  {
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule a property viewing directly through our website by simply selecting the viewing option, choosing a convenient time, and confirming your appointment.",
  },
  {
    question: "What should I do if I find a property that interests me?",
    answer:
      "If you find a property that interests you, you can either contact the listing agent directly through the website or schedule a viewing to see the property in person.",
  },
  {
    question: "Is there a fee for using HomeSpace to find properties?",
    answer:
      "HomeSpace is free to use. However, any service charges or fees related to leasing or purchasing a property will be outlined in the property listing details, so please review that information carefully.",
  },
];
const PropertyDetailsPg = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const Property = useSelector((store) => store.property);

  useEffect(() => {
    if (propertyId) {
      dispatch(getPropertyById(propertyId));
      dispatch(getAllProperties());
    }
  }, [dispatch, propertyId]);

  const handleSave = async (propertyId) => {
    try {
      await dispatch(saveProperty(propertyId));
      dispatch(getPropertyById(propertyId));
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each child by 0.2 seconds
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, filter: "blur(4px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <div className="px-2 md:px-6  w-full  max-w-5xl lg:max-w-6xl  xl:max-w-7xl  2xl:max-w-8xl mx-auto   font-jakarta  light_gray ">
      <PropertyDetails property={Property?.property} handleSave={handleSave} />
      {/* FAQ Section */}
      <section className="w-full px-2  xl:max-w-6xl 2xl:max-w-8xl mx-auto py-12 lg:py-24 ">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 2xl:gap-20 items-start">
          <div className="md:mt-5 ">
            <h2 className=" max-lg:text-center text-text text-4xl 2xl:text-5xl font-semibold mb-4  2xl:mb-6 dark:text-[#F8FDFF]">
              Frequently asked questions
            </h2>
            <p className="hidden lg:block text-muted-foreground mb-2 ">
              Still have a question?
            </p>
            <Link
              to="/"
              className="group  hidden lg:inline-flex items-center text-primary font-medium hover:underline gap-x-1 dark:text-muted-foreground"
            >
              Contact us
              <ArrowRight className="group-hover:rotate-0 duration-200  size-5 transform -rotate-45" />
            </Link>
          </div>
          <div className="">
            <Accordion type="single" collapsible className="w-full divide-y">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`item-${index}`}
                  value={`item-${index}`}
                  className="py-2"
                >
                  <AccordionTrigger className="flex items-center justify-between py-4 2 max-md:text-sm xl:text-xl text-lg font-medium md:tracking-wide dark:text-[#F8FDFF]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 mr-5 md:mr-8 lg:text-base text-muted-foreground text-sm text-pretty tracking-wider leading-snug font-normal">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      {/* SImilar Properties */}
      <section className="  h-full mt-8 md:my-16 ">
        <div className="flex flex-col items-center justify-center gap-y-2 pb-12">
          {" "}
          <MotionHeading
            className="  text-center  "
            text={`Similar Properties`}
          />
          <MotionText
            className=" text-center "
            text={`Checkout some other properties near you`}
          />
        </div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-md:overflow-y-scroll md:gap-y-12 gap-x-4 lg:gap-x-8 justify-center lg:justify-start  mx-auto flex md:grid grid-cols-2 lg:grid-cols-3 similarProps"
        >
          {Property?.properties?.properties?.slice(0, 6).map((property) => (
            <SimilarProps
              key={property?.id}
              property={property}
              cardVariants={cardVariants}
            />
          ))}
        </motion.section>
        <div className="w-full flex justify-center py-8 md:py-14">
          <Link to="/property">
            <Button className="flex  h-11 bg-indigo-700 px-6  rounded-lg hover:bg-Primary Bgpurple/80 text-white text-sm tracking-wide font-semibold hover:shadow-lg">
              Browse Properties
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailsPg;
