import { motion } from "framer-motion";

const Hearts3DScene = () => {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
    size: 30 + Math.random() * 50,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden perspective-1000">
      {/* Large center pulsing hearts */}
      <motion.div
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          rotateY: [0, 15, -15, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="bigHeart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(350 90% 65%)" />
              <stop offset="50%" stopColor="hsl(0 85% 50%)" />
              <stop offset="100%" stopColor="hsl(350 80% 40%)" />
            </linearGradient>
            <filter id="glow3d">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M50 88 C20 60 5 40 5 25 C5 10 20 5 35 5 C45 5 50 15 50 15 C50 15 55 5 65 5 C80 5 95 10 95 25 C95 40 80 60 50 88 Z"
            fill="url(#bigHeart)"
            filter="url(#glow3d)"
          />
          <ellipse cx="30" cy="25" rx="12" ry="8" fill="hsl(0 0% 100% / 0.35)" transform="rotate(-25 30 25)" />
        </svg>
      </motion.div>

      {/* Floating 3D hearts with depth */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            zIndex: Math.floor(heart.z),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 0.8 - heart.z / 200, 0.8 - heart.z / 200, 0],
            y: [0, -100 - heart.z],
            x: [0, (Math.random() - 0.5) * 100],
            rotateY: [0, 360],
            rotateZ: [0, (Math.random() - 0.5) * 60],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg
            width={heart.size * (1 - heart.z / 200)}
            height={heart.size * (1 - heart.z / 200)}
            viewBox="0 0 24 24"
            style={{
              filter: `blur(${heart.z / 50}px) drop-shadow(0 4px 8px hsl(0 85% 50% / 0.3))`,
            }}
          >
            <defs>
              <linearGradient id={`heartGrad${heart.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(350 90% 70%)" />
                <stop offset="100%" stopColor="hsl(0 80% 45%)" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`url(#heartGrad${heart.id})`}
            />
          </svg>
        </motion.div>
      ))}

      {/* Sparkle effects */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-jewelry-diamond"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default Hearts3DScene;
