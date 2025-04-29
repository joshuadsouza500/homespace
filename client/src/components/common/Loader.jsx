import { useEffect, useState } from "react";

export default function Loader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 2 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col -mt-20 items-center justify-center h-screen bg-slate-50">
      <div className="bg-Primary size-16 flex items-center justify-center rounded-md shadow-md">
        <div className="size-10 border-4 border-white border-t-transparent rounded-full animate-spin dark:border-bborder"></div>
      </div>
      <p className="mt-3 text-xl font-medium text-Primary">Loading{dots}</p>
    </div>
  );
}
