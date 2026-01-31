import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoveMessage = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "You are the reason my heart learned how to believe in love again.\nWith you, even the smallest moments feel like priceless treasures.\nWill you stay and make me the luckiest soul alive?\nThere will be days when life tests us,\nwhen we may drift, even if only a little.\nOn those days, let your effort meet mine—\nwe'll hold each other, understand each other,\nand walk forward together.\nYes, we will argue.\nYes, we will feel anger.\nBut let that anger never grow strong enough\nto push our hearts apart.\nIf I ever lose my way,\nplease calm your storm and talk to me.\nAnd if you ever stumble,\nI promise I'll be the one who listens, who stays.\nThis is love, this is life—\nnot perfection, but effort.\nA little from you, a little from me,\nevery single day.\nSince the moment you came into my life,\neverything feels different… softer, deeper, real.\nI don't know why,\nbut loving you feels like home—\na feeling too beautiful for words.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="relative max-w-lg mx-auto"
    >
      {/* Decorative frame */}
      <div className="relative p-8 rounded-2xl backdrop-blur-sm bg-card/30 border border-primary/20 shadow-2xl">
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-jewelry-gold rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-jewelry-gold rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-jewelry-gold rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-jewelry-gold rounded-br-lg" />

        {/* Message text */}
        <p className="font-elegant text-lg md:text-xl text-center text-foreground/90 leading-relaxed italic whitespace-pre-line">
          "{displayText}"
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-primary"
          >
            |
          </motion.span>
        </p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="mt-6 text-center"
        >
          <span className="font-romantic text-2xl text-primary">With all my love</span>
        </motion.div>
      </div>

      {/* Floating hearts around message */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 50}%`,
            left: `${i % 2 === 0 ? -20 : 100}px`,
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        >
          <span className="text-xl">💕</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LoveMessage;
