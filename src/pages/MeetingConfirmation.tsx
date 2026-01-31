import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

// Falling Petals Component
const FallingPetals = () => {
  const petals = [
    { type: 'pink-rose', emoji: '🌹', size: 'text-2xl md:text-3xl' },
    { type: 'dark-red-rose', emoji: '🥀', size: 'text-xl md:text-2xl' },
    { type: 'marigold', emoji: '🌼', size: 'text-lg md:text-xl' },
    { type: 'pink-rose', emoji: '🌸', size: 'text-xl md:text-2xl' },
    { type: 'dark-red-rose', emoji: '🌺', size: 'text-2xl md:text-3xl' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => {
        const petal = petals[i % petals.length];
        const delay = Math.random() * 5;
        const duration = (8 + Math.random() * 4) * 4; // 75% slower (multiply by 4)
        const startX = Math.random() * 100;
        const swayAmount = (30 + Math.random() * 50) * 0.25; // 75% less sway
        
        return (
          <motion.div
            key={i}
            className={`absolute ${petal.size}`}
            style={{
              left: `${startX}%`,
              top: '-10%',
            }}
            initial={{ 
              y: -50, 
              x: 0, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{
              y: window.innerHeight + 100,
              x: [0, swayAmount, -swayAmount, swayAmount, 0],
              rotate: [0, 45, 90, 135, 180], // 75% less rotation (720° → 180°)
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
              ease: "linear"
            }}
          >
            <span 
              className={petal.type === 'pink-rose' ? 'text-pink-300' : 
                        petal.type === 'dark-red-rose' ? 'text-red-600' : 
                        'text-orange-400'}
              style={{
                filter: petal.type === 'pink-rose' ? 'brightness(1.2)' : 
                        petal.type === 'dark-red-rose' ? 'brightness(0.8)' : 
                        'brightness(1.1)',
                opacity: 0.8
              }}
            >
              {petal.emoji}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

const MeetingConfirmation = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "chudel 😅, since you clicked \"Yes\", be ready to meet me on 24th June 2026—wearing a hot, sexy red dress. No excuses, got it? 😉\nIf you had selected the date yourself, I would've received a message. But now that you've clicked yes, we're meeting on this exact date, like a proper date, and that too on my birthday 🎂. Understood, bandariya? 😜\nI could've made it even more extra and created a special website for every single day, but hosting takes credits 😂 and I don't want to waste them. Otherwise, I'd need to take a ₹15,000 subscription just for hosting 😆.\nSo for now, just be happy only in this and enjoy every day of February—Propose Day 💍, Chocolate Day 🍫, Teddy Day 🧸, Promise Day 🤞, Hug Day 🫂, Kiss Day 💋, and Valentine's Day ❤️. Enjoy them alone… not with someone else 🤭🤭 (just kidding!).\nDo whatever you want—you're an independent woman, yaar 🫡😁.\nJust remember… be ready for the selected date 😜🔥";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-romantic">
      {/* Falling Petals Animation */}
      <FallingPetals />

      {/* Floating 3D Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, -50, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-full h-full text-heart-red/60" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-8 left-8"
        >
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-2 border-primary/30 bg-card/50 backdrop-blur-sm px-4 py-2 font-elegant text-primary transition-all duration-300 hover:border-primary/50 hover:bg-card/70"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Electric Card with Message */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, type: "spring" }}
          className="relative max-w-4xl mx-auto w-full"
        >
          {/* Electric Card Container */}
          <motion.div
            className="relative p-8 md:p-12 rounded-3xl backdrop-blur-sm bg-card/30 border border-primary/20 shadow-2xl cursor-pointer group"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Electric Wire Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
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

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-jewelry-gold rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-jewelry-gold rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-jewelry-gold rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-jewelry-gold rounded-br-lg" />

            {/* Message Text */}
            <div className="relative z-10">
              <h2 className="font-romantic text-3xl md:text-4xl text-center text-gradient-romantic mb-6">
                Meeting Confirmed! 💕
              </h2>
              
              <div className="bg-black/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <p className="font-elegant text-lg md:text-xl text-foreground/90 leading-relaxed whitespace-pre-line">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-primary ml-1"
                  >
                    |
                  </motion.span>
                </p>
              </div>

              {/* Date Highlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-heart-red to-primary rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                  <span className="font-elegant text-xl font-bold text-white">
                    24 June 2026
                  </span>
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Hearts Around Card */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl"
            style={{
              top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 40}%`,
              left: `${i % 2 === 0 ? -10 : 110}%`,
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            <span className="text-heart-red/70">💕</span>
          </motion.div>
        ))}
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-deep/20 to-transparent" />
    </div>
  );
};

export default MeetingConfirmation;
