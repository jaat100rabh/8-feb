import { motion } from "framer-motion";

interface LuxuryRingBoxProps {
  isOpen: boolean;
}

const LuxuryRingBox = ({ isOpen }: LuxuryRingBoxProps) => {
  return (
    <motion.div
      initial={{ scale: 0, rotateY: -90 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }}
      className="relative"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Glow effect behind box */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "radial-gradient(circle, hsl(0 85% 50% / 0.4) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Box container with 3D perspective */}
        <div className="absolute inset-0 flex items-end justify-center pb-8">
          {/* Box bottom/base */}
          <div className="relative">
            {/* Outer velvet box */}
            <motion.div
              className="relative w-52 h-40 md:w-64 md:h-48 rounded-xl"
              style={{
                background: "linear-gradient(145deg, hsl(0 75% 30%) 0%, hsl(0 80% 20%) 50%, hsl(0 85% 15%) 100%)",
                boxShadow: `
                  0 20px 60px hsl(0 0% 0% / 0.5),
                  inset 0 2px 4px hsl(0 60% 40% / 0.3),
                  inset 0 -5px 15px hsl(0 80% 10% / 0.5)
                `,
              }}
            >
              {/* Velvet interior */}
              <div
                className="absolute inset-3 rounded-lg overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, hsl(0 85% 18%) 0%, hsl(0 80% 12%) 100%)",
                  boxShadow: "inset 0 5px 20px hsl(0 0% 0% / 0.5)",
                }}
              >
                {/* Velvet texture lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-gradient-to-r from-transparent via-rose-blush to-transparent"
                      style={{ top: `${i * 5}%` }}
                    />
                  ))}
                </div>

                {/* Ring pillow/cushion */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-24 md:w-24 md:h-28">
                  <div
                    className="w-full h-full rounded-t-full"
                    style={{
                      background: "linear-gradient(180deg, hsl(0 85% 22%) 0%, hsl(0 80% 15%) 100%)",
                      boxShadow: "0 -5px 15px hsl(0 0% 0% / 0.3)",
                    }}
                  />

                  {/* THE RING */}
                  <motion.div
                    className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2"
                    initial={{ y: 30, opacity: 0, rotateX: -45 }}
                    animate={isOpen ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                  >
                    {/* Ring band - Silver with shine */}
                    <div className="relative">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full"
                        style={{
                          background: `
                            linear-gradient(135deg, 
                              hsl(0 0% 95%) 0%, 
                              hsl(0 0% 75%) 25%, 
                              hsl(0 0% 90%) 50%, 
                              hsl(0 0% 70%) 75%, 
                              hsl(0 0% 88%) 100%
                            )
                          `,
                          boxShadow: `
                            0 8px 25px hsl(0 0% 0% / 0.4),
                            inset 0 2px 4px hsl(0 0% 100% / 0.6),
                            inset 0 -2px 4px hsl(0 0% 50% / 0.3)
                          `,
                          border: "3px solid hsl(0 0% 80%)",
                        }}
                      >
                        {/* Inner ring hole */}
                        <div
                          className="absolute inset-3 md:inset-4 rounded-full"
                          style={{
                            background: "linear-gradient(180deg, hsl(0 80% 15%) 0%, hsl(0 85% 10%) 100%)",
                          }}
                        />

                        {/* Ring shine animation */}
                        <motion.div
                          className="absolute inset-0 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="absolute w-full h-full"
                            style={{
                              background: "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.6) 50%, transparent 100%)",
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          />
                        </motion.div>
                      </div>

                      {/* Diamond setting */}
                      <motion.div
                        className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2"
                        animate={{
                          rotateZ: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {/* Diamond prongs */}
                        <div className="relative">
                          {/* Prong base */}
                          <div
                            className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4"
                            style={{
                              background: "linear-gradient(180deg, hsl(0 0% 85%) 0%, hsl(0 0% 70%) 100%)",
                            }}
                          />

                          {/* The Diamond */}
                          <motion.div
                            className="relative"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <div
                              className="w-8 h-8 md:w-10 md:h-10 rotate-45"
                              style={{
                                background: `
                                  linear-gradient(135deg,
                                    hsl(200 30% 98%) 0%,
                                    hsl(200 40% 92%) 20%,
                                    hsl(200 20% 96%) 40%,
                                    hsl(200 50% 88%) 60%,
                                    hsl(200 30% 94%) 80%,
                                    hsl(200 25% 98%) 100%
                                  )
                                `,
                                boxShadow: `
                                  0 0 30px hsl(200 50% 90% / 0.8),
                                  0 0 60px hsl(200 40% 95% / 0.5),
                                  inset 0 0 15px hsl(200 60% 95% / 0.5)
                                `,
                              }}
                            />

                            {/* Diamond facets */}
                            <div className="absolute inset-0 rotate-45 overflow-hidden">
                              <div
                                className="absolute inset-0"
                                style={{
                                  background: `
                                    linear-gradient(45deg, transparent 40%, hsl(0 0% 100% / 0.8) 50%, transparent 60%),
                                    linear-gradient(-45deg, transparent 40%, hsl(200 50% 95% / 0.6) 50%, transparent 60%)
                                  `,
                                }}
                              />
                            </div>

                            {/* Rainbow light refraction */}
                            <motion.div
                              className="absolute inset-0 rotate-45"
                              animate={{ rotate: [45, 405] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                              <div
                                className="w-full h-full"
                                style={{
                                  background: `
                                    conic-gradient(
                                      from 0deg,
                                      hsl(0 70% 70% / 0.3),
                                      hsl(60 70% 70% / 0.3),
                                      hsl(120 70% 70% / 0.3),
                                      hsl(180 70% 70% / 0.3),
                                      hsl(240 70% 70% / 0.3),
                                      hsl(300 70% 70% / 0.3),
                                      hsl(360 70% 70% / 0.3)
                                    )
                                  `,
                                  mixBlendMode: "overlay",
                                }}
                              />
                            </motion.div>

                            {/* Sparkle rays */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                              <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-jewelry-diamond to-transparent origin-left"
                                style={{ rotate: `${angle}deg` }}
                                animate={{ opacity: [0, 1, 0], scaleX: [0.5, 1.5, 0.5] }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                }}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Gold trim on box */}
              <div
                className="absolute inset-x-4 top-3 h-0.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(45 100% 50%), transparent)",
                }}
              />
              <div
                className="absolute inset-x-4 bottom-3 h-0.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(45 100% 50%), transparent)",
                }}
              />
            </motion.div>

            {/* Box lid */}
            <motion.div
              className="absolute -top-1 left-0 right-0 h-12 md:h-14 origin-top"
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: -130 } : { rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Lid front */}
              <div
                className="w-full h-full rounded-t-xl"
                style={{
                  background: "linear-gradient(180deg, hsl(0 70% 38%) 0%, hsl(0 75% 30%) 100%)",
                  boxShadow: "0 -4px 15px hsl(0 0% 0% / 0.3)",
                }}
              >
                {/* Lid emblem */}
                <div className="absolute inset-x-0 top-3 flex justify-center">
                  <div
                    className="w-16 h-6 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(45 100% 55% / 0.6), transparent)",
                    }}
                  />
                </div>
              </div>

              {/* Lid inner surface (visible when open) */}
              <div
                className="absolute top-full left-0 right-0 h-12 md:h-14 origin-top"
                style={{
                  transform: "rotateX(-90deg)",
                  background: "linear-gradient(180deg, hsl(0 85% 18%) 0%, hsl(0 80% 12%) 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LuxuryRingBox;
