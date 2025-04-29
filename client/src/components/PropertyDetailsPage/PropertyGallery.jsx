import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/UI/ShadCN/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "../UI/ShadCN/dialog";

export default function PropertyGallery({ images }) {
  const [showGallery, setShowGallery] = useState(false);
  const [activeImage, setActiveImage] = useState(0); //says what the active image is so it shows that image in gallery

  const handlePrevious = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!showGallery) return;

      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "Escape") {
        setShowGallery(false);
      }
    },
    [showGallery]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative">
      <div className="grid md:grid-cols-[3fr,1fr] gap-3 cursor-pointer">
        {/* Main Image and arrows for smaller screens */}
        <div
          onClick={() => {
            setActiveImage(0);
            setShowGallery(true);
          }}
          className="relative  aspect-video overflow-hidden rounded-lg "
        >
          <img
            src={images[0]}
            alt={images[0]}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-[1.02]"
          />
          <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-white">
            {activeImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Column */}
        <div className="hidden md:grid grid-rows-2 gap-3 ">
          <div
            onClick={() => {
              setActiveImage(1);
              setShowGallery(true);
            }}
            className="relative aspect-auto overflow-hidden rounded-lg "
          >
            <img
              src={images[1] || "/placeholder.svg"}
              alt={images[1] || "Property image"}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div
            onClick={() => {
              setActiveImage(2);
              setShowGallery(true);
            }}
            className="relative aspect-auto overflow-hidden rounded-lg "
          >
            {images.length > 2 ? (
              <>
                <img
                  src={images[2]}
                  alt={images[2]}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-[1.02] "
                />
                {images.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      +{images.length - 3} more
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-5xl bg-black/95 border-none">
          <div className="relative aspect-[16/9] mt-8">
            <img
              src={images[activeImage]}
              alt={images[activeImage]}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowGallery(false)}
              className="text-white hover:bg-white/20 hover:text-red-500"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="text-white hover:bg-white/20 "
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-white hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {activeImage + 1} / {images.length}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
