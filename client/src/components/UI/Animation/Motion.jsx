import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const MotionHeading = ({ text, className, delay, duration }) => {
  return (
    <span className="inline-block overflow-hidden  ">
      <motion.h1
        className={cn(
          "text-3xl md:text-4xl font-bold text-text dark:text-[#F8FDFF] ",
          className
        )}
        initial={{ y: "100%", opacity: 0.4 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          delay: delay || 0.1,
          duration: duration || 0.3,
        }}
        viewport={{ once: true }}
      >
        {text}
      </motion.h1>
    </span>
  );
};

export const MotionText = ({ text, className, delay }) => {
  return (
    <span className="inline-block overflow-hidden text-left ">
      <motion.p
        className={cn(
          "max-sm:text-sm  text-pretty text-muted-foreground  tracking-wide  ",
          className
        )}
        initial={{ y: "100%", opacity: 0.8 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          delay: delay || 0.3,
          duration: 0.5,
        }}
        viewport={{ once: true }}
      >
        {text}
      </motion.p>
    </span>
  );
};
