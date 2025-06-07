import { motion } from "framer-motion";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "#overview", label: "Overview" },
    { href: "#structure", label: "Structure" },
    { href: "#pricing", label: "Pricing" },
    { href: "#register", label: "Register" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div 
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="text-gold-500 text-2xl" />
              <span className="text-xl font-bold gradient-text">Summary Automates</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering young entrepreneurs to transform ideas into successful businesses.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Mail className="mr-3 text-gold-500" size={16} />
                <a href="mailto:summaryautomations@gmail.com" className="hover:text-gold-500 transition-colors">
                  summaryautomations@gmail.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <Phone className="mr-3 text-gold-500 mt-1" size={16} />
                <div className="space-y-1">
                  <div className="hover:text-gold-500 transition-colors">+27 68 483 9679</div>
                  <div className="hover:text-gold-500 transition-colors">+91 9373395733</div>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <MapPin className="mr-3 text-gold-500" size={16} />
                Global Operations
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400">
            &copy; 2025 Summary Automates T&C apply. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
