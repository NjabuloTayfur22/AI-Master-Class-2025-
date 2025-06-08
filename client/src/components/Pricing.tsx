import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { useCurrencyContext } from "@/context/CurrencyContext";
import CurrencySwitcher from "./CurrencySwitcher";

export default function Pricing() {
  const { toast } = useToast();
  const currencyCtx = useCurrencyContext();
  const currency = currencyCtx?.currency || 'ZAR';
  const convert = currencyCtx?.convert || ((v: number) => v);
  const getSymbol = currencyCtx?.getSymbol || ((c: string) => 'R');
  const loading = currencyCtx?.loading || false;

  // Prices in ZAR (base)
  const pricingPlans = [
    {
      title: "Individual Mastery",
      subtitle: "Vision to Reality",
      priceZAR: 249,
      period: "/masterclass", 
      popular: true,
      features: [
        "3-hour growthacking unleashed with AI", 
        "From Ideation to Building MVP", 
        "Luxury landing page mastery workshop",
        "AI-powered business domination tactics",
        "10 mindblowing AI hacks for easing daily life", 
        "Chance to network through worldwide like-minded people" 
      ],
      buttonText: "SECURE YOUR SPOT",
      exclusive: "Limited to 21 Visionaries"
    },
    {
      title: "One on One ", 
      subtitle: "Ultimate Premium Experience",
      priceZAR: 1000,
      period: "/empire",
      popular: false,
      features: [
        "Private 1-on-1 consultation", 
        "Ideating business architecture design", 
        "Exclusive AI networking community", 
        "Global access to AI masterminds", 
        "From ideation to building to deployement", 
        "Make money using AI automations" 
      ],
      buttonText: "CLAIM YOUR SEAT", 
      exclusive: "Ultimate Premium Experience"
    },
  ];

  return (
    <section
      id="pricing"
      className="min-h-screen snap-start relative overflow-hidden py-20 bg-gradient-to-b from-black via-navy-900 to-black"
    >
      <div className="container-responsive relative z-10">
        <div className="flex justify-end mb-6">
          <CurrencySwitcher />
        </div>

        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={fadeInUp}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600">
              Investment in Greatness
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Premium transformation experiences designed for visionary entrepreneurs
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`
                relative rounded-2xl overflow-hidden
                backdrop-blur-md
                ${plan.popular 
                  ? 'border-2 border-yellow-400/30 bg-gradient-to-b from-yellow-950/40 to-black/60' 
                  : 'border border-gray-800/50 bg-gradient-to-b from-gray-950/40 to-black/60'}
              `}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-6 py-1 text-sm font-semibold rounded-b-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 md:p-10 space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                    {plan.title}
                  </h3>
                  <p className="text-gray-400">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center pb-4 border-b border-gray-800/50">
                  <span className="text-5xl md:text-6xl font-bold text-white">
                    {loading ? '...' : `${getSymbol?.(currency)}${convert?.(plan.priceZAR).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                  </span>
                  <span className="text-gray-400 text-lg">{plan.period}</span>
                  <div className="mt-2 text-yellow-500 text-sm font-medium">
                    {plan.exclusive}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <Check className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={() => document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" })}
                  className={`
                    w-full py-4 rounded-lg font-semibold transition-all
                    ${plan.popular 
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:shadow-lg hover:shadow-yellow-500/20' 
                      : 'bg-white/10 text-white hover:bg-white/20'}
                  `}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicator */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400">
            Join our community of successful entrepreneurs worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
