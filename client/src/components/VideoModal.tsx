import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl mx-auto bg-navy-900 rounded-2xl overflow-hidden border border-gold-500/20"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold-500/20">
              <h3 className="text-xl font-semibold text-white">Masterclass Preview</h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gold-500/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gold-500" />
              </motion.button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              {/* Preview Image/Placeholder */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8)), url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <motion.div
                  className="text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 bg-gold-500 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(212, 175, 55, 0.5)",
                        "0 0 40px rgba(212, 175, 55, 0.8)",
                        "0 0 20px rgba(212, 175, 55, 0.5)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-8 h-8 text-navy-900 ml-1" />
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-2">Masterclass Sneak Peek</h4>
                  <p className="text-gray-300">Get a glimpse of what awaits you in this transformative journey</p>
                  
                  {/* Simulated preview content */}
                  <motion.div
                    className="mt-8 space-y-4 text-left max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <span className="text-sm">Learn proven strategies for idea validation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-sm">Build your MVP with expert guidance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm">Connect with like-minded entrepreneurs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-sm">Access exclusive resources and tools</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating elements for visual appeal */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold-400 rounded-full opacity-60"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-navy-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={togglePlay}
                    className="flex items-center space-x-2 text-gold-500 hover:text-gold-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    <span className="text-sm">Preview Coming Soon</span>
                  </motion.button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">Duration: 3:45</span>
                  <motion.button
                    onClick={toggleMute}
                    className="text-gold-500 hover:text-gold-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div 
                  className="w-full h-1 bg-gray-600 rounded-full cursor-pointer overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress + 25, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}