import { motion } from "framer-motion";

interface RingBoxProps {
  isOpen: boolean;
}

const RingBox = ({ isOpen }: RingBoxProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-64 h-64 md:w-80 md:h-80"
    >
      {/* Box base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 md:w-56 md:h-36">
        {/* Box bottom */}
        <div 
          className="absolute bottom-0 w-full h-24 md:h-28 rounded-lg"
          style={{
            background: "linear-gradient(180deg, hsl(0 70% 35%) 0%, hsl(0 80% 25%) 100%)",
            boxShadow: "inset 0 -10px 20px hsl(0 80% 15%), 0 10px 30px hsl(0 0% 0% / 0.3)",
          }}
        >
          {/* Velvet interior */}
          <div 
            className="absolute inset-2 rounded-md"
            style={{
              background: "linear-gradient(180deg, hsl(0 80% 20%) 0%, hsl(0 70% 15%) 100%)",
            }}
          />
          
          {/* Ring holder */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-16 md:w-14 md:h-20">
            <div 
              className="w-full h-full rounded-t-full"
              style={{
                background: "linear-gradient(180deg, hsl(0 80% 25%) 0%, hsl(0 70% 15%) 100%)",
              }}
            />
            
            {/* The Ring */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isOpen ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              {/* Ring band */}
              <div 
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-4 md:border-[5px]"
                style={{
                  borderColor: "hsl(0 0% 80%)",
                  background: "linear-gradient(135deg, hsl(0 0% 95%) 0%, hsl(0 0% 75%) 50%, hsl(0 0% 85%) 100%)",
                  boxShadow: "0 4px 15px hsl(0 0% 0% / 0.3), inset 0 2px 4px hsl(0 0% 100% / 0.5)",
                }}
              >
                {/* Inner ring */}
                <div 
                  className="absolute inset-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(0 0% 70%) 0%, hsl(0 0% 90%) 50%, hsl(0 0% 75%) 100%)",
                  }}
                />
                
                {/* Diamond */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  {/* Diamond shape */}
                  <div className="relative">
                    <div 
                      className="w-5 h-5 md:w-6 md:h-6 rotate-45"
                      style={{
                        background: "linear-gradient(135deg, hsl(200 20% 98%) 0%, hsl(200 30% 90%) 25%, hsl(200 20% 95%) 50%, hsl(200 25% 85%) 75%, hsl(200 20% 98%) 100%)",
                        boxShadow: "0 0 20px hsl(200 30% 90% / 0.8), 0 0 40px hsl(200 30% 95% / 0.5)",
                      }}
                    />
                    {/* Diamond sparkle */}
                    <div className="absolute inset-0 rotate-45 ring-shine opacity-50" />
                  </div>
                  
                  {/* Sparkle effects */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-jewelry-diamond rounded-full"
                      style={{
                        top: `${-5 + Math.sin(i * 90 * Math.PI / 180) * 15}px`,
                        left: `${10 + Math.cos(i * 90 * Math.PI / 180) * 15}px`,
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Box lid */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: -120 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            transformOrigin: "top center",
            perspective: "1000px",
          }}
          className="absolute -top-2 w-full h-8 md:h-10"
        >
          <div 
            className="w-full h-full rounded-t-lg"
            style={{
              background: "linear-gradient(180deg, hsl(0 65% 40%) 0%, hsl(0 70% 35%) 100%)",
              boxShadow: "0 -4px 10px hsl(0 0% 0% / 0.2)",
            }}
          >
            {/* Lid decoration */}
            <div className="absolute inset-x-4 top-2 h-1 rounded-full bg-jewelry-gold opacity-60" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RingBox;
