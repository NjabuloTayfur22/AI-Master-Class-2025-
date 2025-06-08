import { motion, useReducedMotion } from "framer-motion";
import { Rocket, Play, ChevronDown, Star, Sparkles, Code, Cpu, Zap, Globe, Database, Wifi, Terminal, Smartphone, Brain, Target, Trophy } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import VideoModal from "./VideoModal";
import SpectacularLogo from "./SpectacularLogo";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCurrency } from "@/hooks/useCurrency";

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [energyLevel, setEnergyLevel] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const currencyCtx = useCurrency();
  const currency = currencyCtx?.currency || 'ZAR';
  const convert = currencyCtx?.convert || ((v: number) => v);
  const getSymbol = currencyCtx?.getSymbol || ((c: string) => 'R');
  const loading = currencyCtx?.loading || false;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (shouldReduceMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    const interval = setInterval(() => {
      setEnergyLevel((prev) => (prev + 1) % 100);
    }, isMobile ? 200 : 100);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [isMobile, shouldReduceMotion]);

  const scrollToNext = () => {
    const element = document.querySelector("#overview");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const techIcons = [Code, Cpu, Zap, Globe, Database, Wifi, Terminal, Smartphone, Brain, Target, Trophy];
  const techColors = [
    'text-blue-400', 'text-purple-400', 'text-green-400', 'text-cyan-400',
    'text-pink-400', 'text-yellow-400', 'text-red-400', 'text-indigo-400',
    'text-emerald-400', 'text-orange-400', 'text-rose-400'
  ];

  const particleCount = shouldReduceMotion ? 0 : isMobile ? 30 : 60;

  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden animated-bg">
      {/* Luxury floating particles */}
      <div className="particles">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax gold overlays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10"
        style={{
          transform: `translateX(${mousePosition.x * 0.02}px)`,
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"
        style={{
          transform: `translateY(${energyLevel * 0.1}px)`,
        }}
      />
      
      {/* Luxury grid pattern */}
      <div className="absolute inset-0 luxury-grid opacity-30" />
      
      {/* Tech circuit pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`circuit-${i}`}
            className="absolute"
            style={{
              top: `${10 + (i * 12)}%`,
              left: `${5 + (i * 11)}%`,
              width: '200px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${techColors[i % techColors.length].replace('text-', 'rgb(')}, transparent)`
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Floating tech icons with colorful animations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const TechIcon = techIcons[i % techIcons.length];
          const colorClass = techColors[i % techColors.length];
          return (
            <motion.div
              key={`tech-icon-${i}`}
              className={`absolute ${colorClass}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-40, 40, -40],
                x: [-15, 15, -15],
                rotate: [0, 360],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <TechIcon size={24 + Math.random() * 16} />
            </motion.div>
          );
        })}
      </div>

      {/* Animated data streams */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`data-stream-${i}`}
            className="absolute opacity-30"
            style={{
              top: `${10 + i * 15}%`,
              left: '-10%',
              width: '120%',
              height: '1px',
            }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r from-transparent via-${techColors[i % techColors.length].split('-')[1]}-400 to-transparent`}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
            {/* Binary data dots */}
            {[...Array(5)].map((_, j) => (
              <motion.div
                key={`dot-${i}-${j}`}
                className={`absolute w-1 h-1 rounded-full ${techColors[(i + j) % techColors.length].replace('text-', 'bg-')}`}
                style={{
                  top: '-2px',
                  left: `${j * 25}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3 + j * 0.2
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Glowing tech particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`glow-particle-${i}`}
            className={`absolute w-2 h-2 rounded-full ${techColors[i % techColors.length].replace('text-', 'bg-')} opacity-60`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${techColors[i % techColors.length].replace('text-', '').replace('-400', '')}`
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen pt-8 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-5xl mx-auto px-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-luxury font-bold mb-8 relative"
            variants={fadeInUp}
          >
            <motion.span
              className="block text-white/90"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ELEVATE YOUR
            </motion.span>
            <motion.span 
              className="block gradient-luxury text-transparent bg-clip-text relative"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))"
              }}
            >
              ENTREPRENEURIAL
              <motion.div
                className="absolute -top-4 -right-4 glow-gold"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </motion.span>
            <motion.span
              className="block text-white/90"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              MASTERY
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl font-elegant text-gray-200/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            An exclusive <span className="gradient-luxury text-transparent bg-clip-text">premium masterclass</span> designed for the next generation of visionary entrepreneurs aged 16-25
          </motion.p>

          <motion.div variants={fadeInUp}>
            <CountdownTimer />
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
            variants={fadeInUp}
          >
            <motion.button
              className="btn-luxury hover-luxury magnetic text-lg px-12 py-6 text-black font-bold tracking-wider"
              whileHover={{ 
                scale: 1.08, 
                y: -4,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" })}
            >
              <motion.div
                className="relative flex items-center justify-center"
                whileHover={{ x: 3 }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Rocket className="inline mr-3" size={24} />
                </motion.div>
                {`CLAIM YOUR LEGACY - ${loading ? '...' : `${getSymbol(currency)}${convert(249).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}`}
              </motion.div>
            </motion.button>
            
            <motion.button
              className="glass-morphism-dark hover-luxury magnetic px-10 py-6 rounded-xl font-bold text-lg border border-yellow-400/40 group backdrop-blur-xl text-white/90 tracking-wide"
              whileHover={{ 
                scale: 1.08, 
                y: -4,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoModalOpen(true)}
            >
              <motion.div
                className="relative flex items-center justify-center"
                whileHover={{ x: 3 }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.3,
                    rotate: 15 
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Play className="inline mr-3" size={24} />
                </motion.div>
                PREVIEW EXCELLENCE
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-gold-500 text-2xl" />
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </section>
  );
}
