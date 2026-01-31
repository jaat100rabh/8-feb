import { motion } from "framer-motion";

const FloatingRoses = () => {
  const roses = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {roses.map((rose) => (
        <motion.div
          key={rose.id}
          className="absolute"
          initial={{ y: "100vh", x: `${rose.left}vw`, rotate: 0, opacity: 0.8 }}
          animate={{ 
            y: "-20vh", 
            rotate: 360,
            opacity: [0.8, 0.6, 0],
          }}
          transition={{
            duration: rose.duration,
            repeat: Infinity,
            delay: rose.delay,
            ease: "linear",
          }}
        >
          {/* Rose petal SVG */}
          <svg
            width={rose.size}
            height={rose.size}
            viewBox="0 0 50 50"
            fill="none"
          >
            <defs>
              <radialGradient id={`roseGradient${rose.id}`} cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="hsl(350 90% 70%)" />
                <stop offset="50%" stopColor="hsl(350 85% 55%)" />
                <stop offset="100%" stopColor="hsl(0 80% 45%)" />
              </radialGradient>
            </defs>
            {/* Simplified rose shape */}
            <ellipse cx="25" cy="25" rx="18" ry="22" fill={`url(#roseGradient${rose.id})`} />
            <ellipse cx="25" cy="20" rx="10" ry="12" fill="hsl(350 90% 65%)" opacity="0.6" />
            <ellipse cx="25" cy="17" rx="5" ry="6" fill="hsl(350 95% 70%)" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
      
      {/* Floating hearts */}
      {Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 5,
        size: 15 + Math.random() * 15,
      })).map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute"
          initial={{ y: "110vh", x: `${heart.left}vw`, scale: 0 }}
          animate={{ 
            y: "-10vh",
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="hsl(0 85% 50%)"
            opacity={0.4}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingRoses;
