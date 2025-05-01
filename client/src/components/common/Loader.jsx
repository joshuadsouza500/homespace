import { useEffect, useState } from "react";

export default function Loader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 2 ? "" : prev + "."));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen h-full bg-slate-50 dark:bg-[#181818]">
      <div className="bg-Primary size-16 flex items-center justify-center rounded-md shadow-md ">
        <div className="size-10 border-4 border-white border-t-transparent rounded-full animate-spin dark:border-light_gray/70 dark:border-t-white"></div>
      </div>
      <p className="mt-3 text-xl font-medium text-Primary">Loading{dots}</p>
    </div>
  );
}
