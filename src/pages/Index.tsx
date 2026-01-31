import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Heart3D from "@/components/Heart3D";
import LuxuryRingBox from "@/components/LuxuryRingBox";
import FloatingRoses from "@/components/FloatingRoses";
import Hearts3DScene from "@/components/Hearts3DScene";
import Confetti from "@/components/Confetti";
import LoveMessage from "@/components/LoveMessage";
import ImageAlbum from "@/components/ImageAlbum";
import NewDatePicker from "@/components/NewDatePicker";
import { Button } from "@/components/ui/button";
import { saveResponseToSupabase, saveToLocalStorage } from "@/lib/supabase";

const Index = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [heartbroken, setHeartbroken] = useState(false);
  const [hoveringNo, setHoveringNo] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [meetingResponse, setMeetingResponse] = useState<string | null>(null);
  const [showSuggestDatePicker, setShowSuggestDatePicker] = useState(false);
  const [suggestedDate, setSuggestedDate] = useState<string | null>(null);

  const handleAccept = () => {
    setAccepted(true);
    setDeclined(false);
  };

  const handleNoHover = () => {
    // Move the button away when trying to hover
    setNoButtonPosition({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
    setHoveringNo(true);
  };

  const handleDecline = () => {
    setDeclined(true);
  };

  const handleTryAgain = () => {
    setDeclined(false);
    setNoButtonPosition({ x: 0, y: 0 });
  };

  const handleDeclineClose = () => {
    // Save the decline response to database
    const response_data = {
      response: 'decline_close: Definitely not',
      timestamp: new Date().toISOString(),
      type: 'proposal_response' as const
    };
    
    try {
      saveResponseToSupabase(response_data);
      console.log('Decline close response saved to Supabase successfully');
    } catch (error) {
      console.log('Supabase not available, saving to localStorage');
      const saved = saveToLocalStorage(response_data);
      if (saved) {
        console.log('Decline close response saved to localStorage successfully');
      }
    }

    // Close the window/tab
    window.close();
    
    // Fallback: redirect to a blank page if window.close() doesn't work
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 1000);
  };

  const handleMeetingResponse = async (response: string) => {
    setMeetingResponse(response);
    
    // Save response to Supabase
    const response_data = {
      response: `meeting_response: ${response}`,
      timestamp: new Date().toISOString(),
      type: 'meeting_response' as const
    };
    
    try {
      await saveResponseToSupabase(response_data);
      console.log('Meeting response saved to Supabase successfully');
    } catch (error) {
      console.log('Supabase not available, saving to localStorage');
      const saved = saveToLocalStorage(response_data);
      if (saved) {
        console.log('Meeting response saved to localStorage successfully');
      }
    }

    // Navigate to meeting confirmation page if response is "yes"
    if (response === "yes") {
      setTimeout(() => {
        navigate("/meeting-confirmation");
      }, 1000); // Delay for visual feedback
    }
    
  };



  const handleSuggestAnotherDate = () => {
    setShowSuggestDatePicker(true);
  };

  const handleSuggestDateSelect = async (date: string) => {
    setSuggestedDate(date);
    
    // Save suggested date to Supabase
    const suggest_data = {
      response: `suggested_another_date: ${date}`,
      timestamp: new Date().toISOString(),
      type: 'alternative_date' as const
    };
    
    try {
      await saveResponseToSupabase(suggest_data);
      console.log('Suggested another date saved to Supabase successfully');
    } catch (error) {
      console.log('Supabase not available, saving to localStorage');
      const saved = saveToLocalStorage(suggest_data);
      if (saved) {
        console.log('Suggested another date saved to localStorage successfully');
      }
    }
    
    // Hide date picker after selection
    setShowSuggestDatePicker(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-romantic">
      {/* Floating roses background */}
      <FloatingRoses />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              {/* 3D Heart */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Heart3D />
              </motion.div>

              {/* Date */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <h2 className="font-elegant text-2xl md:text-3xl font-semibold tracking-widest text-primary">
                  8 February 2026
                </h2>
              </motion.div>

              {/* Propose Day title */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4"
              >
                <h1 className="font-romantic text-5xl md:text-7xl lg:text-8xl text-gradient-romantic">
                  Propose Day
                </h1>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-10 flex justify-center gap-4 flex-wrap"
              ><Button
                  onClick={handleDeclineClose}
                  size="lg"
                  className="min-w-[160px] bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6 font-elegant text-lg font-semibold tracking-wider text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow"
                >
                  Definitly not
                </Button>

                <Button
                  onClick={handleAccept}
                  size="lg"
                  className="min-w-[160px] bg-gradient-to-r from-heart-red to-primary px-8 py-6 font-elegant text-lg font-semibold tracking-wider text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow"
                >
                 💕 Yes, I love you too
                </Button>
                
                
              </motion.div>

              {/* Declined message */}
              <AnimatePresence>
                {declined && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 text-center"
                  >
                    <p className="font-elegant text-lg text-foreground/70">
                      💔 Please reconsider... My heart beats only for you!
                    </p>
                    <Button
                      onClick={handleTryAgain}
                      variant="ghost"
                      className="mt-4 font-elegant text-primary underline-offset-4 hover:underline"
                    >
                      Give me another chance? 💕
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex flex-col items-center min-h-screen w-full pt-8 pb-16"
            >
              {/* Confetti celebration */}
              <Confetti />

              {/* 3D Hearts floating scene */}
              <Hearts3DScene />

              {/* Main celebration content */}
              <div className="relative z-20 flex flex-col items-center">
                {/* Big YES reveal */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.2 
                  }}
                  className="mb-6"
                >
                  <h1 className="font-romantic text-6xl md:text-8xl lg:text-9xl text-gradient-romantic drop-shadow-2xl">
                   Thank you Monika for accepting my proposal🥰🥰
                  </h1>
                </motion.div>

                {/* Animated emojis burst */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="flex gap-3 mb-8"
                >
                  {["💍", "💕", "✨", "💖", "🌹", "💕", "💍"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-3xl md:text-4xl"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="font-elegant text-xl md:text-2xl text-foreground/80 text-center max-w-md mb-8"
                >
                   “Monika, I don’t promise perfection, but I promise a love that chooses you in every lifetime—through every change, every challenge, and every quiet moment in between. With you, forever isn’t a dream; it’s a decision I make with my whole heart.
                </motion.p>

                {/* Ring Box Image with Card Effects */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1, type: "spring" }}
                  className="mb-8 relative"
                >
                  {/* Electric wire effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-2xl"
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
                  
                  {/* Card with shadow effects */}
                  <motion.div
                    className="relative bg-gradient-to-br from-rose-50/80 to-pink-100/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-rose-200/50"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Inner card shadow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    
                    {/* Electric wire glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: `
                          0 0 20px rgba(255, 255, 255, 0.5),
                          0 0 40px rgba(255, 255, 255, 0.3),
                          0 0 60px rgba(255, 255, 255, 0.1),
                          inset 0 0 20px rgba(255, 255, 255, 0.1)
                        `
                      }}
                      animate={{
                        boxShadow: [
                          `
                            0 0 20px rgba(255, 255, 255, 0.5),
                            0 0 40px rgba(255, 255, 255, 0.3),
                            0 0 60px rgba(255, 255, 255, 0.1),
                            inset 0 0 20px rgba(255, 255, 255, 0.1)
                          `,
                          `
                            0 0 30px rgba(255, 255, 255, 0.7),
                            0 0 50px rgba(255, 255, 255, 0.5),
                            0 0 70px rgba(255, 255, 255, 0.3),
                            inset 0 0 30px rgba(255, 255, 255, 0.2)
                          `,
                          `
                            0 0 20px rgba(255, 255, 255, 0.5),
                            0 0 40px rgba(255, 255, 255, 0.3),
                            0 0 60px rgba(255, 255, 255, 0.1),
                            inset 0 0 20px rgba(255, 255, 255, 0.1)
                          `
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    <img 
                      src="ring-box.jpeg" 
                      alt="Ring Box" 
                      className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-lg relative z-10"
                    />
                  </motion.div>
                </motion.div>

                {/* Love Message */}
                <div className="mt-8 px-4">
                  <LoveMessage />
                </div>

                {/* Instagram Links */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.5, duration: 0.8 }}
                  className="mb-6 text-center space-y-3"
                >
                  <a
                    href="https://www.instagram.com/monikathakur__3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-elegant text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-purple-600 hover:to-pink-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                    @monikathakur__3
                  </a>
                  
                  <a
                    href="https://www.instagram.com/dedicated_jaat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-elegant text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-blue-600 hover:to-purple-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                    @dedicated_jaat
                  </a>
                </motion.div>

                {/* Image Album */}
                <ImageAlbum 
                  images={[
                    "monika 16.jpeg",
                    "monika 2.jpeg",
                    "monika 3.jpeg",
                    "monika 4.jpeg",
                    "monika 5.jpeg",
                    "monika 6.jpeg",
                    "monika 7.jpeg",
                    "monika 8.jpeg",
                    "monika 9.jpeg",
                    "monika 10.jpeg",
                    "monika 11.jpeg",
                    "monika 12.jpeg",
                    "monika 13.jpeg",
                    "monika 14.jpeg",
                    "monika 15.jpeg",
                    "monika 1.jpeg",
                  ]}
                />

                {/* Forever promise */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.5, type: "spring" }}
                  className="mt-12 text-center"
                >
                  <p className="font-romantic text-4xl md:text-5xl text-primary animate-pulse">
                    Forever & Always
                  </p>
                  
                  {/* Date badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                    className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20"
                  >
                    <span className="text-2xl">💑</span>
                    <span className="font-elegant text-lg text-foreground/80">8th February 2026</span>
                    <span className="text-2xl">💑</span>
                  </motion.div>

                  {/* Ready for Marriage Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.5 }}
                    className="mt-8"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-heart-red to-primary px-8 py-4 font-elegant text-lg font-semibold tracking-wider text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow"
                    >
                      Lets meet on 24 june 2026 in Sexy Red Dress💃🏻?? you are free nah on my birthday
                    </Button>
                  </motion.div>

                  {/* Yes/No Response Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5 }}
                    className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Button
                      onClick={() => handleMeetingResponse("yes")}
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-elegant text-base font-semibold tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    >
                      ✅ Yes
                    </Button>
                    <Button
                      onClick={() => handleMeetingResponse("no")}
                      size="lg"
                      variant="outline"
                      className="border-2 border-red-400 px-6 py-3 font-elegant text-base font-semibold tracking-wider text-red-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-red-50"
                    >
                      ❌ No
                    </Button>
                  </motion.div>

                  {/* Response Message */}
                  <AnimatePresence>
                    {meetingResponse && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 text-center"
                      >
                        <p className="font-elegant text-lg text-foreground/80">
                          {meetingResponse === "yes" 
                            ? "🎉 Amazing! I'm so excited for our meeting on June 24th! 💕" 
                            : "💔 That's okay, I understand."
                          }
                        </p>
                        
                      </motion.div>
                    )}
                  </AnimatePresence>


                </motion.div>

                {/* Floating hearts around */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl"
                      style={{
                        left: `${(i / 12) * 100}%`,
                        top: `${50 + Math.sin(i) * 30}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>

                {/* Suggest Another Date Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.8, duration: 0.8 }}
                  className="mt-12"
                >
                  <Button
                    onClick={handleSuggestAnotherDate}
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-300 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 transition-all duration-300 px-8 py-4 font-elegant text-lg font-semibold tracking-wider text-purple-700 shadow-lg"
                  >
                    📅 Suggest Another Date
                  </Button>
                </motion.div>

                {/* Suggest Date Picker */}
                <NewDatePicker 
                  isVisible={showSuggestDatePicker}
                  onDateSelect={handleSuggestDateSelect}
                />

                {/* Suggested Date Confirmation */}
                <AnimatePresence>
                  {suggestedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 text-center"
                    >
                      <p className="font-elegant text-lg text-purple-800">
                        📅 Perfect! I've noted your suggested date: {suggestedDate} 💕
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative bottom gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-deep/20 to-transparent" />
    </div>
  );
};

export default Index;
