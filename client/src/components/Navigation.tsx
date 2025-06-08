import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GraduationCap, Menu, X, Sparkles, Zap, Star, Rocket } from "lucide-react";
import SpectacularLogo from "./SpectacularLogo";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [colorCycle, setColorCycle] = useState(0);
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ["overview", "structure", "pricing", "register"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Color cycling effect for glowing navbar
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setColorCycle((prev) => (prev + 1) % 360);
    }, isMobile ? 200 : 100);
    return () => clearInterval(interval);
  }, [isMobile, shouldReduceMotion]);

  const navItems = [
    { href: "#overview", label: "Overview", id: "overview" },
    { href: "#structure", label: "Structure", id: "structure" },
    { href: "#pricing", label: "Pricing", id: "pricing" },
    { href: "#register", label: "Register", id: "register" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundImage: [
              `linear-gradient(${colorCycle}deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.95))`,
              `linear-gradient(${colorCycle + 120}deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98))`,
              `linear-gradient(${colorCycle}deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.95))`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-20 h-20 rounded-full blur-xl opacity-30`}
            style={{
              backgroundColor: `hsl(${(colorCycle + i * 72) % 360}, 70%, 60%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + Math.sin(i) * 20}%`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsla(${colorCycle}, 70%, 60%, 0.1) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 50%, hsla(${(colorCycle + 180) % 360}, 70%, 60%, 0.1) 0%, transparent 50%)`
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo with glow */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ 
                filter: `drop-shadow(0 0 15px hsl(${colorCycle}, 70%, 60%))`,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <SpectacularLogo size="small" className="mr-3" />
            </motion.div>
            <motion.button
              onClick={() => window.location.href = '/'}
              className="text-2xl font-bold cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(45deg, hsl(${colorCycle}, 70%, 60%), hsl(${(colorCycle + 60) % 360}, 70%, 70%))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 10px hsl(${colorCycle}, 70%, 60%))`
              }}
              animate={{
                textShadow: [
                  `0 0 20px hsl(${colorCycle}, 70%, 60%)`,
                  `0 0 30px hsl(${(colorCycle + 60) % 360}, 70%, 70%)`,
                  `0 0 20px hsl(${colorCycle}, 70%, 60%)`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Summary Automates
            </motion.button>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`relative font-semibold text-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "font-bold"
                    : "hover:scale-110"
                }`}
                style={{
                  color: activeSection === item.id 
                    ? `hsl(${(colorCycle + index * 30) % 360}, 70%, 70%)`
                    : 'rgba(255, 255, 255, 0.9)',
                  textShadow: activeSection === item.id 
                    ? `0 0 15px hsl(${(colorCycle + index * 30) % 360}, 70%, 70%)`
                    : 'none'
                }}
                whileHover={{ 
                  y: -3,
                  filter: `drop-shadow(0 0 10px hsl(${(colorCycle + index * 40) % 360}, 70%, 60%))`
                }}
                animate={activeSection === item.id ? {
                  textShadow: [
                    `0 0 15px hsl(${(colorCycle + index * 30) % 360}, 70%, 70%)`,
                    `0 0 25px hsl(${(colorCycle + index * 30 + 60) % 360}, 70%, 80%)`,
                    `0 0 15px hsl(${(colorCycle + index * 30) % 360}, 70%, 70%)`
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(${(colorCycle + index * 30) % 360}, 70%, 60%), hsl(${(colorCycle + index * 30 + 60) % 360}, 70%, 70%))`
                    }}
                    layoutId="activeTab"
                    animate={{
                      boxShadow: [
                        `0 0 10px hsl(${(colorCycle + index * 30) % 360}, 70%, 60%)`,
                        `0 0 20px hsl(${(colorCycle + index * 30 + 60) % 360}, 70%, 70%)`,
                        `0 0 10px hsl(${(colorCycle + index * 30) % 360}, 70%, 60%)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Eye-Catching CTA Button */}
          <motion.div
            className="hidden md:block relative"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 2, -2, 0],
              transition: { rotate: { duration: 0.3 } }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className="relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg tracking-wide text-black"
              style={{
                backgroundImage: `linear-gradient(45deg, hsl(${colorCycle}, 80%, 60%), hsl(${(colorCycle + 120) % 360}, 80%, 60%), hsl(${(colorCycle + 240) % 360}, 80%, 60%))`,
                boxShadow: `0 0 20px hsl(${colorCycle}, 80%, 60%)`
              }}
              onClick={() => scrollToSection("#register")}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                animate={{ translateX: ['100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative flex items-center">
                <Rocket className="mr-2" size={20} />
                SECURE YOUR SPOT
              </span>
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden glass-morphism p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gold-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gold-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden glass-morphism border-t border-gold-500/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left text-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-gold-400 font-semibold"
                      : "text-white/80"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                href="#register"
                onClick={() => scrollToSection("#register")}
                className="bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 w-full py-3 rounded-full font-semibold mt-4 text-center block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Register Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}