import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GraduationCap, Sparkles, Star, Zap, Brain, Rocket, Code, Cpu, Globe, Database } from "lucide-react";

interface SpectacularLogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function SpectacularLogo({ size = "medium", className = "" }: SpectacularLogoProps) {
  const [colorPhase, setColorPhase] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Size configurations
  const sizeConfig = {
    small: { container: "w-12 h-12", icon: 24, text: "text-lg", orbit: 15 },
    medium: { container: "w-20 h-20", icon: 32, text: "text-2xl", orbit: 25 },
    large: { container: "w-32 h-32", icon: 48, text: "text-4xl", orbit: 40 }
  };

  const config = sizeConfig[size];

  useEffect(() => {
    // Color phase animation
    const colorInterval = setInterval(() => {
      setColorPhase((prev) => (prev + 1) % 360);
    }, 50);

    // Generate floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }));
    setParticles(newParticles);

    return () => clearInterval(colorInterval);
  }, []);

  const techIcons = [Code, Cpu, Brain, Database, Globe, Rocket];

  return (
    <div className={`relative ${config.container} ${className}`}>
      {/* Outer energy ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `conic-gradient(from ${colorPhase}deg, 
            hsl(${colorPhase}, 80%, 60%), 
            hsl(${(colorPhase + 60) % 360}, 80%, 70%), 
            hsl(${(colorPhase + 120) % 360}, 80%, 60%), 
            hsl(${(colorPhase + 180) % 360}, 80%, 70%), 
            hsl(${(colorPhase + 240) % 360}, 80%, 60%), 
            hsl(${(colorPhase + 300) % 360}, 80%, 70%), 
            hsl(${colorPhase}, 80%, 60%))`,
          borderRadius: "50%",
          padding: "3px"
        }}
      >
        <div className="w-full h-full bg-slate-900 rounded-full" />
      </motion.div>

      {/* Inner glow ring */}
      <motion.div
        className="absolute inset-2 rounded-full"
        animate={{
          boxShadow: [
            `inset 0 0 20px hsl(${colorPhase}, 70%, 50%, 0.5)`,
            `inset 0 0 40px hsl(${(colorPhase + 120) % 360}, 70%, 50%, 0.8)`,
            `inset 0 0 20px hsl(${colorPhase}, 70%, 50%, 0.5)`
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          background: `radial-gradient(circle, 
            hsla(${colorPhase}, 60%, 30%, 0.3) 0%, 
            hsla(${(colorPhase + 180) % 360}, 60%, 20%, 0.6) 100%)`
        }}
      />

      {/* Central graduation cap */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        <motion.div
          animate={{
            filter: [
              `drop-shadow(0 0 10px hsl(${colorPhase}, 80%, 60%))`,
              `drop-shadow(0 0 20px hsl(${(colorPhase + 120) % 360}, 80%, 60%))`,
              `drop-shadow(0 0 10px hsl(${colorPhase}, 80%, 60%))`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <GraduationCap 
            size={config.icon} 
            style={{ color: `hsl(${colorPhase}, 80%, 70%)` }}
          />
        </motion.div>
      </motion.div>

      {/* Orbiting tech icons */}
      {techIcons.map((TechIcon, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2 + i * 0.5, repeat: Infinity }
          }}
          style={{
            transformOrigin: `${config.orbit}px 0px`,
            transform: `rotate(${i * 60}deg)`
          }}
        >
          <motion.div
            animate={{
              rotate: [0, -360]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <TechIcon 
              size={12 + size === "large" ? 8 : size === "medium" ? 4 : 0} 
              style={{ 
                color: `hsl(${(colorPhase + i * 60) % 360}, 70%, 60%)`,
                filter: `drop-shadow(0 0 8px hsl(${(colorPhase + i * 60) % 360}, 70%, 60%))`
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: `hsl(${(colorPhase + particle.id * 30) % 360}, 80%, 70%)`
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pulsing sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            top: `${20 + Math.sin(i * Math.PI / 4) * 30}%`,
            left: `${20 + Math.cos(i * Math.PI / 4) * 30}%`
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25
          }}
        >
          {i % 2 === 0 ? (
            <Sparkles 
              size={8} 
              style={{ color: `hsl(${(colorPhase + i * 45) % 360}, 80%, 70%)` }} 
            />
          ) : (
            <Star 
              size={6} 
              style={{ color: `hsl(${(colorPhase + i * 45) % 360}, 80%, 70%)` }} 
            />
          )}
        </motion.div>
      ))}

      {/* Energy bolts */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`bolt-${i}`}
          className="absolute top-1/2 left-1/2"
          animate={{
            rotate: [i * 90, i * 90 + 360],
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1
          }}
          style={{
            transformOrigin: `${config.orbit + 10}px 0px`
          }}
        >
          <Zap 
            size={12} 
            style={{ 
              color: `hsl(${(colorPhase + 180) % 360}, 90%, 70%)`,
              filter: `drop-shadow(0 0 10px hsl(${(colorPhase + 180) % 360}, 90%, 70%))`
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
}