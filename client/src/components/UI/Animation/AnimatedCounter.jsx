import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { animate } from "motion";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const AnimatedCounter = ({ number, className, delay = 0.2 }) => {
  const count = useMotionValue(0); //reactive and can be updated
  const newCount = useTransform(count, (latest) => {
    return Math.round(latest); //Takes count and return the output version you want here it is a rounded value
  });
  useEffect(() => {
    const value = animate(count, number, {
      duration: 1.5,
      ease: "circOut",
      delay,
    }); //animates count from starting number to new number

    return () => value.stop();
  }, []);

  return <motion.span className={cn("", className)}>{newCount}</motion.span>; //since its a motion element it can use the motion value and display the number animaton smoothly
};
AnimatedCounter.propTypes = {
  number: PropTypes.number.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
};

export default AnimatedCounter;
