import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, rotateIn, bounceIn, glowAnimation } from "@/lib/animations";
import { 
  Users, 
  Lightbulb, 
  Rocket, 
  Globe, 
  Zap, 
  MessageCircle, 
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react";

export default function MasterclassStructure() {
  const sessions = [
    {
      number: "01",
      title: "Introduction",
      duration: "15 minutes",
      description: "Ice breaker activities and masterclass objectives overview",
      details: [
        "Name game for networking",
        "Sharing unique business ideas",
        "Overview of objectives",
        "Expected outcomes discussion"
      ],
      icon: Users,
      color: "from-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
      reverse: false,
    },
    {
      number: "02",
      title: "Understanding Business Ideas",
      duration: "30 minutes",
      description: "Brainstorming, target audience identification, and idea validation techniques",
      details: [
        "Collaborative brainstorming session",
        "Problem-solution fit analysis",
        "Target audience identification",
        "Business viability assessment quiz"
      ],
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      bgPattern: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
      reverse: true,
    },
    {
      number: "03",
      title: "Transitioning Ideas to Reality",
      duration: "45 minutes",
      description: "Market validation strategies and MVP development planning",
      details: [
        "Market research methodologies",
        "Customer feedback loops",
        "MVP concept introduction",
        "Personal MVP planning session"
      ],
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
      reverse: false,
    },
    {
      number: "04",
      title: "Building a Digital Presence",
      duration: "45 minutes",
      description: "Creating professional websites and landing pages on a budget",
      details: [
        "Landing page fundamentals",
        "Low-cost platform comparison",
        "Hands-on website building",
        "Design best practices"
      ],
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      bgPattern: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
      reverse: true,
    },
    {
      number: "05",
      title: "Advanced Website Features",
      duration: "30 minutes",
      description: "Implementing dynamic features and AI-powered business hacks",
      details: [
        "Dynamic vs static features",
        "Luxury design elements",
        "10 free AI business hacks",
        "Cost-effective implementations"
      ],
      icon: Zap,
      color: "from-red-500 to-rose-500",
      bgPattern: "bg-gradient-to-br from-red-900/20 to-rose-900/20",
      reverse: false,
    },
    {
      number: "06",
      title: "Q&A and Wrap-up",
      duration: "15 minutes",
      description: "Interactive discussion and key takeaways sharing",
      details: [
        "Open floor questions",
        "Expert guidance session",
        "Key takeaways sharing",
        "Next steps planning"
      ],
      icon: MessageCircle,
      color: "from-indigo-500 to-purple-500",
      bgPattern: "bg-gradient-to-br from-indigo-900/20 to-purple-900/20",
      reverse: true,
    },
    {
      number: "07",
      title: "Feedback and Evaluation",
      duration: "15 minutes",
      description: "Course evaluation and continued learning resources",
      details: [
        "Effectiveness assessment",
        "Feedback form completion",
        "Resource list distribution",
        "Community access setup"
      ],
      icon: Star,
      color: "from-gold-500 to-yellow-500",
      bgPattern: "bg-gradient-to-br from-gold-900/20 to-yellow-900/20",
      reverse: false,
    },
  ];

  return (
    <section
      id="structure"
      className="min-h-screen snap-start py-20 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 90% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)
        `
      }}
    >
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`floating-${i}`}
            className="absolute"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 11}%`,
              width: '30px',
              height: '30px',
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${sessions[i % sessions.length].color} rounded-lg blur-sm`} />
          </motion.div>
        ))}
      </div>

      {/* Flowing connection lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.svg
            key={`connection-${i}`}
            className="absolute"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + i * 8}%`,
              width: '300px',
              height: '150px',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.2
            }}
          >
            <motion.path
              d={`M0,75 Q150,${30 + Math.random() * 90} 300,75`}
              fill="none"
              stroke={`url(#gradient-${i})`}
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8
              }}
            />
            <defs>
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor={sessions[i % sessions.length].color.includes('purple') ? '#8b5cf6' : 
                                              sessions[i % sessions.length].color.includes('yellow') ? '#f59e0b' :
                                              sessions[i % sessions.length].color.includes('blue') ? '#3b82f6' :
                                              sessions[i % sessions.length].color.includes('green') ? '#10b981' :
                                              sessions[i % sessions.length].color.includes('red') ? '#ef4444' :
                                              sessions[i % sessions.length].color.includes('indigo') ? '#6366f1' : '#d4af37'} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </motion.svg>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            variants={bounceIn}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-navy-900" />
            </motion.div>
            <span className="text-gold-500 font-semibold tracking-wider uppercase text-sm">Premium Curriculum</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-serif font-bold mb-8"
            variants={fadeInUp}
          >
            Masterclass <span className="gradient-text relative">
              Structure
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 bg-gold-500 rounded-full shadow-lg shadow-gold-500/50" />
              </motion.div>
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            variants={fadeInUp}
          >
            A meticulously crafted 3-hour journey from innovative ideas to entrepreneurial reality
          </motion.p>

          {/* Total Duration Badge */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-navy-800/80 to-navy-700/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gold-500/20"
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-6 h-6 text-gold-500" />
            <span className="text-lg font-semibold">Total Duration: 3 Hours of Intensive Learning</span>
          </motion.div>
        </motion.div>

        {/* Sessions Grid */}
        <div className="space-y-12">
          {sessions.map((session, index) => {
            const IconComponent = session.icon;
            
            return (
              <motion.div
                key={session.number}
                className={`flex flex-col ${session.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Session Card */}
                <motion.div
                  className="flex-1 w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`relative p-8 lg:p-10 rounded-3xl border border-white/10 backdrop-blur-sm ${session.bgPattern} overflow-hidden group`}>
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${session.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                      initial={false}
                    />
                    
                    {/* 3D floating elements */}
                    <div className="absolute top-4 right-4 opacity-20">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-3 h-3 bg-gradient-to-r ${session.color} rounded-full`}
                          style={{
                            top: `${i * 15}px`,
                            right: `${i * 10}px`,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className={`w-16 h-16 bg-gradient-to-r ${session.color} rounded-2xl flex items-center justify-center shadow-2xl`}
                            whileHover={{ 
                              rotate: [0, -10, 10, 0],
                              scale: 1.1 
                            }}
                            transition={{ duration: 0.5 }}
                            style={{ 
                              boxShadow: `0 0 30px rgba(212, 175, 55, 0.3)` 
                            }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>
                          
                          <div>
                            <motion.span 
                              className={`text-4xl font-bold bg-gradient-to-r ${session.color} bg-clip-text text-transparent`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {session.number}
                            </motion.span>
                          </div>
                        </div>
                        
                        <motion.div
                          className="flex items-center space-x-2 bg-navy-800/50 px-4 py-2 rounded-xl border border-gold-500/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Clock className="w-4 h-4 text-gold-500" />
                          <span className="text-sm font-medium text-gold-500">{session.duration}</span>
                        </motion.div>
                      </div>

                      <motion.h3 
                        className="text-2xl lg:text-3xl font-bold mb-4 text-white"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {session.title}
                      </motion.h3>
                      
                      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                        {session.description}
                      </p>

                      {/* Session Details */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <ArrowRight className="w-5 h-5 mr-2 text-gold-500" />
                          What You'll Learn:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {session.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detailIndex}
                              className="flex items-center space-x-3 p-3 rounded-xl bg-navy-800/30 border border-white/5"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              whileHover={{ 
                                x: 5,
                                backgroundColor: "rgba(30, 41, 59, 0.5)"
                              }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Optimized Visual Element */}
                <motion.div
                  className="lg:flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                >
                  <motion.div
                    className="relative w-48 h-48 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Main Icon Container */}
                    <motion.div
                      className={`w-full h-full bg-gradient-to-br ${session.color} rounded-3xl border border-white/20 flex items-center justify-center backdrop-blur-sm relative overflow-hidden`}
                      style={{ 
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)`
                      }}
                      animate={{
                        boxShadow: [
                          `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)`,
                          `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.4)`,
                          `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)`
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-lg rotate-45" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white/20 rounded-full" />
                        <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/10 rounded-sm rotate-12" />
                      </div>
                      
                      {/* Main Icon */}
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <IconComponent className="w-16 h-16 text-white relative z-10" />
                      </motion.div>
                      
                      {/* Session Number Badge */}
                      <motion.div
                        className="absolute -top-3 -right-3 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-navy-900 font-bold text-lg">{session.number}</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-gold-500 to-yellow-500 text-navy-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6" />
            <span>Ready to Transform Your Ideas?</span>
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}