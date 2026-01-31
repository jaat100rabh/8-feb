import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageAlbumProps {
  images: string[];
}

const ImageAlbum = ({ images }: ImageAlbumProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2, duration: 0.8 }}
      className="relative w-full max-w-6xl mx-auto mt-12 px-4"
    >
      {/* Album Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4 }}
        className="font-romantic text-3xl md:text-4xl text-center text-primary mb-8"
      >
        next time I hope both are together in this
      </motion.h2>

      {/* Main Image Container */}
      <div className="relative group">
        {/* Card Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-rose-100/80 to-pink-100/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-200/50"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />

        {/* Electric Wire Effect */}
        <motion.div
          className="absolute -inset-2 rounded-3xl"
          style={{
            background: `
              linear-gradient(45deg, 
                transparent 30%, 
                rgba(255, 255, 255, 0.1) 50%, 
                transparent 70%
              ),
              linear-gradient(-45deg, 
                transparent 30%, 
                rgba(255, 255, 255, 0.05) 50%, 
                transparent 70%
              )
            `,
          }}
          animate={{
            background: [
              `
                linear-gradient(45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.1) 50%, 
                  transparent 70%
                ),
                linear-gradient(-45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  transparent 70%
                )
              `,
              `
                linear-gradient(45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.2) 50%, 
                  transparent 70%
                ),
                linear-gradient(-45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.1) 50%, 
                  transparent 70%
                )
              `,
              `
                linear-gradient(45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.1) 50%, 
                  transparent 70%
                ),
                linear-gradient(-45deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, 0.05) 50%, 
                  transparent 70%
                )
              `
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Image Display */}
        <div className="relative z-10 rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-contain rounded-3xl bg-black/5"
            />
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {/* Left Arrow */}
            <Button
              onClick={goToPrevious}
              size="lg"
              variant="outline"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-rose-200 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-20"
            >
              <ChevronLeft className="w-6 h-6 text-rose-600" />
            </Button>

            {/* Right Arrow */}
            <Button
              onClick={goToNext}
              size="lg"
              variant="outline"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-rose-200 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg z-20"
            >
              <ChevronRight className="w-6 h-6 text-rose-600" />
            </Button>
          </>
        )}
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6 }}
          className="flex justify-center gap-2 mt-6"
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-rose-500 w-8"
                  : "bg-rose-300 hover:bg-rose-400"
              }`}
            />
          ))}
        </motion.div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
          className="text-center mt-4 font-elegant text-foreground/70"
        >
          {currentIndex + 1} / {images.length}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ImageAlbum;
