import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";
import { Clock, Zap } from "lucide-react";

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  const timeUnits = [
    { value: days, label: "Days", color: "text-gold-500" },
    { value: hours, label: "Hours", color: "text-gold-400" },
    { value: minutes, label: "Minutes", color: "text-gold-300" },
    { value: seconds, label: "Seconds", color: "text-gold-200" },
  ];

  return (
    <motion.div 
      className="flex justify-center space-x-4 mb-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-gold-500/20 rounded-2xl blur-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Urgency indicator */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center text-gold-400 text-sm font-semibold"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Clock className="w-4 h-4 mr-1" />
        </motion.div>
        Limited Time Offer
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap className="w-4 h-4 ml-1 text-gold-500" />
        </motion.div>
      </motion.div>

      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="relative countdown-digit rounded-xl p-4 text-center overflow-hidden group"
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)"
          }}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.15,
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          {/* Floating particles around each digit */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`particle-${index}-${i}`}
              className="absolute w-1 h-1 bg-gold-400 rounded-full"
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 30}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
          
          <motion.div 
            className={`text-3xl font-bold ${unit.color} relative z-10`}
            key={unit.value} // Re-animate when value changes
            initial={{ scale: 1.3, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ 
              duration: 0.4,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              scale: 1.2,
              textShadow: "0 0 20px rgba(212, 175, 55, 0.8)"
            }}
          >
            {unit.value.toString().padStart(2, '0')}
          </motion.div>
          
          <motion.div 
            className="text-sm text-gray-400 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {unit.label}
          </motion.div>

          {/* Pulse ring on hover */}
          <motion.div
            className="absolute inset-0 border-2 border-gold-500/0 rounded-xl"
            whileHover={{
              borderColor: "rgba(212, 175, 55, 0.5)",
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
