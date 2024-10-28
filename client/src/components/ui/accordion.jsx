import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          " font-medium    group text-left flex flex-1 gap-10 items-center justify-between py-4 transition-all",
          className
        )}
        {...props}
      >
        {children}
        <PlusCircleIcon
          strokeWidth={1.5}
          className="size-8  shrink-0 group-data-[state=open]:hidden fill-Primary text-white border-none"
        />
        <MinusCircleIcon
          strokeWidth={1.5}
          className="size-8 shrink-0 group-data-[state=closed]:hidden fill-Bgpurple/80 text-white border-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
