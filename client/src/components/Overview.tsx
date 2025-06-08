import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crown, Diamond, Target, Brain, Lightbulb, Rocket, Gem, Star, Zap, Trophy } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Overview() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Crown,
      title: "ELITE EXCLUSIVITY",
      description: "Maximum 21 visionary participants - an intimate mastermind environment where future industry titans connect and collaborate.",
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      glow: "rgba(255, 215, 0, 0.3)"
    },
    {
      icon: Diamond,
      title: "INTENSIVE MASTERY",
      description: "3 hours of concentrated genius-level content worth years of traditional education, compressed into pure entrepreneurial gold.",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      glow: "rgba(168, 85, 247, 0.3)"
    },
    {
      icon: Trophy,
      title: "NEXT-GEN DOMINANCE",
      description: "Crafted exclusively for the ambitious 16-25 age bracket - the generation destined to reshape global business landscapes.",
      gradient: "from-blue-400 via-cyan-500 to-teal-500",
      glow: "rgba(59, 130, 246, 0.3)"
    },
  ];

  const techIcons = [Brain, Lightbulb, Rocket];
  const colors = ['text-emerald-400', 'text-violet-400', 'text-orange-400'];

  return (
    <section
      id="overview"
      className="min-h-screen snap-start py-32 relative overflow-hidden parallax-bg"
      style={{
        backgroundImage: `
          url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80'),
          linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(10, 10, 15, 0.9))
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
      }}
    >
      {/* Luxury floating elements */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
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

      {/* Parallax overlays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5"
        style={{
          transform: `translateX(${mousePosition.x}px)`,
          opacity,
        }}
      />
      
      <motion.div 
        className="absolute inset-0 luxury-grid opacity-10"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 parallax-content">
        <motion.div 
          className="text-center mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          style={{ y }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-luxury font-bold mb-8"
            variants={fadeInUp}
          >
            <span className="text-white/90">MASTERCLASS</span>
            <br />
            <span className="gradient-luxury text-transparent bg-clip-text">SUPREMACY</span>
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl font-elegant text-gray-200/80 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Where visionary minds converge to architect the future of global entrepreneurship through 
            <span className="gradient-luxury text-transparent bg-clip-text"> revolutionary mastery</span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-morphism-dark p-10 rounded-3xl hover-luxury relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  boxShadow: `0 0 40px ${feature.glow}`,
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mr-6 glow-gold`}
                    whileHover={{ 
                      rotate: 15,
                      scale: 1.1,
                    }}
                  >
                    <feature.icon className="text-black text-2xl" />
                  </motion.div>
                  <h3 className="text-3xl font-luxury gradient-luxury text-transparent bg-clip-text tracking-tight">{feature.title}</h3>
                </div>
                <p className="text-gray-200/80 text-lg leading-relaxed font-elegant">{feature.description}</p>
                
                {/* Decorative corner accent */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6 text-yellow-400/50" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Young entrepreneurs collaborating"
              className="rounded-3xl shadow-2xl hover-transform"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
