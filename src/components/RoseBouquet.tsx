import { motion } from "framer-motion";

const RoseBouquet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Bottom rose arrangement */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3">
        {/* Large roses at the bottom */}
        {Array.from({ length: 12 }, (_, i) => {
          const xPos = (i / 11) * 100;
          const yOffset = Math.sin(i * 0.5) * 20;
          const size = 80 + Math.random() * 40;
          const rotation = (Math.random() - 0.5) * 40;
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${xPos}%`,
                bottom: `${10 + yOffset}%`,
                transform: `translateX(-50%) rotate(${rotation}deg)`,
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                className="drop-shadow-lg"
              >
                <defs>
                  <radialGradient id={`bouquetRose${i}`} cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="hsl(350 90% 70%)" />
                    <stop offset="40%" stopColor="hsl(350 85% 55%)" />
                    <stop offset="100%" stopColor="hsl(0 75% 40%)" />
                  </radialGradient>
                </defs>
                
                {/* Outer petals */}
                <ellipse cx="50" cy="55" rx="40" ry="42" fill={`url(#bouquetRose${i})`} />
                <ellipse cx="35" cy="45" rx="25" ry="30" fill="hsl(350 85% 58%)" opacity="0.8" />
                <ellipse cx="65" cy="45" rx="25" ry="30" fill="hsl(350 85% 58%)" opacity="0.8" />
                
                {/* Inner petals */}
                <ellipse cx="50" cy="45" rx="22" ry="25" fill="hsl(350 90% 62%)" />
                <ellipse cx="42" cy="40" rx="15" ry="18" fill="hsl(350 92% 65%)" opacity="0.9" />
                <ellipse cx="58" cy="40" rx="15" ry="18" fill="hsl(350 92% 65%)" opacity="0.9" />
                
                {/* Center */}
                <ellipse cx="50" cy="38" rx="12" ry="14" fill="hsl(350 95% 68%)" />
                <ellipse cx="50" cy="35" rx="6" ry="8" fill="hsl(350 98% 72%)" />
                
                {/* Leaf */}
                <ellipse cx="25" cy="85" rx="15" ry="8" fill="hsl(140 50% 35%)" transform="rotate(-30 25 85)" />
                <ellipse cx="75" cy="85" rx="15" ry="8" fill="hsl(140 50% 35%)" transform="rotate(30 75 85)" />
              </svg>
            </motion.div>
          );
        })}
        
        {/* Decorative leaves */}
        {Array.from({ length: 8 }, (_, i) => {
          const xPos = (i / 7) * 100;
          
          return (
            <motion.div
              key={`leaf-${i}`}
              className="absolute"
              style={{
                left: `${xPos}%`,
                bottom: "0%",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
            >
              <svg width="60" height="80" viewBox="0 0 60 80">
                <ellipse cx="30" cy="50" rx="25" ry="35" fill="hsl(140 45% 30%)" />
                <line x1="30" y1="15" x2="30" y2="80" stroke="hsl(140 40% 25%)" strokeWidth="2" />
              </svg>
            </motion.div>
          );
        })}
      </div>
      
      {/* Corner roses */}
      <motion.div
        className="absolute -top-10 -left-10 opacity-60"
        initial={{ rotate: -45, scale: 0 }}
        animate={{ rotate: -45, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="cornerRose1" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="hsl(350 90% 70%)" />
              <stop offset="100%" stopColor="hsl(0 75% 40%)" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="45" ry="45" fill="url(#cornerRose1)" />
          <ellipse cx="50" cy="45" rx="30" ry="30" fill="hsl(350 88% 60%)" />
          <ellipse cx="50" cy="40" rx="15" ry="15" fill="hsl(350 92% 68%)" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute -top-10 -right-10 opacity-60"
        initial={{ rotate: 45, scale: 0 }}
        animate={{ rotate: 45, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="cornerRose2" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="hsl(350 90% 70%)" />
              <stop offset="100%" stopColor="hsl(0 75% 40%)" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="45" ry="45" fill="url(#cornerRose2)" />
          <ellipse cx="50" cy="45" rx="30" ry="30" fill="hsl(350 88% 60%)" />
          <ellipse cx="50" cy="40" rx="15" ry="15" fill="hsl(350 92% 68%)" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default RoseBouquet;
