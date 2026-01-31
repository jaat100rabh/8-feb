import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Confetti = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    color: string;
    type: "heart" | "sparkle" | "ring";
  }>>([]);

  useEffect(() => {
    const colors = [
      "hsl(350 90% 65%)",
      "hsl(0 85% 55%)",
      "hsl(340 80% 70%)",
      "hsl(45 100% 60%)",
      "hsl(0 0% 95%)",
      "hsl(330 90% 75%)",
    ];
    
    const types: Array<"heart" | "sparkle" | "ring"> = ["heart", "sparkle", "ring"];
    
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 10 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: types[Math.floor(Math.random() * types.length)],
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{ left: `${particle.x}%` }}
          initial={{ y: -50, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {particle.type === "heart" && (
            <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill={particle.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
          {particle.type === "sparkle" && (
            <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill={particle.color}>
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
          )}
          {particle.type === "ring" && (
            <div
              className="rounded-full border-2"
              style={{
                width: particle.size,
                height: particle.size,
                borderColor: particle.color,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
