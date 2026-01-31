import { motion } from "framer-motion";

const Heart3D = () => {
  return (
    <motion.div
      className="relative w-48 h-44 md:w-64 md:h-56"
      animate={{
        y: [0, -20, 0],
        rotateY: [0, 10, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* 3D Heart SVG */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full heart-shadow"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 85% 55%)" />
            <stop offset="50%" stopColor="hsl(350 90% 45%)" />
            <stop offset="100%" stopColor="hsl(0 80% 40%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="innerShadow">
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="hsl(0 80% 30%)" floodOpacity="0.5" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        
        {/* Heart shape path */}
        <path
          d="M50 88 C20 60 5 40 5 25 C5 10 20 5 35 5 C45 5 50 15 50 15 C50 15 55 5 65 5 C80 5 95 10 95 25 C95 40 80 60 50 88 Z"
          fill="url(#heartGradient)"
          filter="url(#glow)"
          style={{
            transformOrigin: "center",
          }}
        />
        
        {/* Highlight for 3D effect */}
        <ellipse
          cx="35"
          cy="25"
          rx="12"
          ry="8"
          fill="hsl(0 0% 100% / 0.3)"
          transform="rotate(-30 35 25)"
        />
        <ellipse
          cx="65"
          cy="25"
          rx="12"
          ry="8"
          fill="hsl(0 0% 100% / 0.25)"
          transform="rotate(30 65 25)"
        />
      </motion.svg>

      {/* Sparkles around the heart */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-jewelry-diamond rounded-full sparkle"
          style={{
            top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
            left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 50}%`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Heart3D;
