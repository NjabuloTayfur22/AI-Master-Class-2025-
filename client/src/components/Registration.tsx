import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { 
  Rocket, 
  Star, 
  Crown, 
  Sparkles, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Zap,
  Trophy,
  Clock,
  Gift
} from "lucide-react";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { fadeInUp, staggerContainer, scaleIn, bounceIn } from "@/lib/animations";

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(16, "Must be at least 16 years old").max(25, "Must be 25 years old or younger"),
  businessIdea: z.string().optional(),
  registrationType: z.enum(["individual", "group"]),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Registration() {
  const { toast } = useToast();
  const [registrationType, setRegistrationType] = useState<"individual" | "group">("individual");

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      businessIdea: "",
      registrationType: "individual",
      agreeToTerms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationFormData) => {
      // Store data for use in onSuccess/onError
      return { formData: data };
    },
    onSuccess: async (response) => {
      const formData = response.formData;
      const simulatedResult = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        registrationType: formData.registrationType,
        businessIdea: formData.businessIdea,
        id: Math.random().toString(36).substr(2, 9)
      };
      
      toast({
        title: "Registration Successful!",
        description: "Redirecting to secure payment...",
      });
      
      localStorage.setItem('registrationData', JSON.stringify(simulatedResult));
      setTimeout(() => {
        window.location.href = '/bank-payment';
      }, 1500);
    },
    onError: async (error: any) => {
      toast({
        title: "Registration Error",
        description: "There was an issue with registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <section
      id="register"
      className="min-h-screen snap-start py-20 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)
        `
      }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`luxury-${i}`}
            className="absolute"
            style={{
              top: `${10 + (i * 8)}%`,
              left: `${5 + (i * 7)}%`,
              width: '20px',
              height: '20px',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i * 0.3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            <Star className="w-full h-full text-gold-500" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Luxury Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center space-x-3 mb-8"
            variants={bounceIn}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Crown className="w-8 h-8 text-navy-900" />
            </motion.div>
            <div className="text-left">
              <div className="text-gold-500 font-bold text-sm uppercase tracking-wider">Exclusive Access</div>
              <div className="text-white text-lg font-semibold">Limited Seats Available</div>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-serif font-bold mb-8"
            variants={fadeInUp}
          >
            <span className="gradient-text relative">
              Transform Your Future
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 20, -20, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-gold-500" />
              </motion.div>
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            variants={fadeInUp}
          >
            Join an elite community of young entrepreneurs and unlock your potential with world-class mentorship
          </motion.p>

          {/* Social Proof */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mb-12"
            variants={fadeInUp}
          >
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gold-500" />
              <span className="text-gray-300">500+ Success Stories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-gold-500" />
              <span className="text-gray-300">98% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gold-500" />
              <span className="text-gray-300">3 Hours to Transform</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Luxury Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden group ${
              registrationType === "individual"
                ? "border-gold-500 bg-gradient-to-br from-gold-500/20 to-yellow-500/10 shadow-2xl shadow-gold-500/20"
                : "border-white/20 bg-white/5 hover:border-gold-500/50"
            }`}
            onClick={() => {
              setRegistrationType("individual");
              form.setValue("registrationType", "individual");
            }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Premium Badge */}
            <div className="absolute top-4 right-4">
              <motion.div
                className="bg-gradient-to-r from-gold-500 to-yellow-500 text-navy-900 px-3 py-1 rounded-full text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                POPULAR
              </motion.div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Crown className="w-6 h-6 text-navy-900" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">Individual VIP</h3>
                  <p className="text-gray-400 text-sm">Personal Excellence</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold gradient-text">R249</span>
                  <span className="text-gray-400 line-through">R399</span>
                </div>
                <p className="text-green-400 text-sm font-semibold">Save 38% - Limited Time</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {[
                  "Personal mentorship session",
                  "Exclusive networking access",
                  "Premium learning materials",
                  "Certificate of completion",
                  "1-month follow-up support"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Selection indicator */}
            {registrationType === "individual" && (
              <motion.div
                className="absolute inset-0 border-2 border-gold-500 rounded-3xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </motion.div>

          <motion.div
            className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden group ${
              registrationType === "group"
                ? "border-purple-500 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-2xl shadow-purple-500/20"
                : "border-white/20 bg-white/5 hover:border-purple-500/50"
            }`}
            onClick={() => {
              setRegistrationType("group");
              form.setValue("registrationType", "group");
            }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Enterprise Badge */}
            <div className="absolute top-4 right-4">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ENTERPRISE
              </motion.div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Users className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">Full Masterclass</h3>
                  <p className="text-gray-400 text-sm">Complete Experience</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">R1000</span>
                  <span className="text-gray-400 line-through">R1500</span>
                </div>
                <p className="text-green-400 text-sm font-semibold">Save 33% - Early Bird</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {[
                  "Complete 3-hour masterclass",
                  "Group collaboration sessions",
                  "Advanced business tools",
                  "Lifetime community access",
                  "3-month mentorship program"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Selection indicator */}
            {registrationType === "group" && (
              <motion.div
                className="absolute inset-0 border-2 border-purple-500 rounded-3xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </motion.div>
        </div>

        <motion.div 
          className="relative backdrop-blur-lg bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
              radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
            `
          }}
        >
          {/* Luxury decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <motion.div
              className="w-full h-full bg-gradient-to-br from-gold-500 to-yellow-500 rounded-full"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              {/* Form Title */}
              <div className="text-center mb-8">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Reserve Your Exclusive Seat
                </motion.h3>
                <p className="text-gray-400">Join the entrepreneurial elite in just 60 seconds</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold flex items-center space-x-2">
                        <span>First Name</span>
                        <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            placeholder="Enter your first name"
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-gold-500 focus:bg-white/15 transition-all duration-300 h-12 rounded-xl"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold flex items-center space-x-2">
                        <span>Last Name</span>
                        <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            placeholder="Enter your last name"
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-gold-500 focus:bg-white/15 transition-all duration-300 h-12 rounded-xl"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold flex items-center space-x-2">
                        <span>Email Address</span>
                        <span className="text-red-400">*</span>
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-gold-500 focus:bg-white/15 transition-all duration-300 h-12 rounded-xl"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold flex items-center space-x-2">
                        <span>Age</span>
                        <span className="text-red-400">*</span>
                      </FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-500 focus:bg-white/15 transition-all duration-300 h-12 rounded-xl">
                            <SelectValue placeholder="Select your age" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-navy-800 border-white/20">
                          {Array.from({ length: 10 }, (_, i) => i + 16).map((age) => (
                            <SelectItem key={age} value={age.toString()} className="text-white hover:bg-gold-500/20">
                              {age} years old
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessIdea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold flex items-center space-x-2">
                      <span>Business Idea</span>
                      <span className="text-gray-400 text-sm">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <motion.div whileFocus={{ scale: 1.01 }}>
                        <Textarea
                          {...field}
                          placeholder="Share your business vision, industry of interest, or entrepreneurial goals..."
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-gold-500 focus:bg-white/15 transition-all duration-300 min-h-24 rounded-xl resize-none"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-4 rounded-xl bg-white/5 border border-white/10">
                    <FormControl>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gold-500 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500 w-5 h-5"
                        />
                      </motion.div>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-white">
                        I agree to the{" "}
                        <span className="text-gold-500 hover:underline cursor-pointer">
                          terms and conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-gold-500 hover:underline cursor-pointer">
                          privacy policy
                        </span>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Luxury CTA Section */}
              <div className="space-y-6 pt-4">
                {/* Urgency Banner */}
                <motion.div
                  className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-4 text-center"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(239, 68, 68, 0)",
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                      "0 0 0 rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-bold text-sm">LIMITED TIME OFFER</span>
                  </div>
                  <p className="text-white text-sm">Only 12 seats remaining at this exclusive price!</p>
                </motion.div>

                {/* Main CTA Button */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-16 bg-gradient-to-r from-gold-500 via-yellow-500 to-gold-400 text-navy-900 rounded-2xl font-bold text-lg shadow-2xl relative overflow-hidden group"
                    disabled={registerMutation.isPending}
                    style={{
                      background: `
                        linear-gradient(45deg, #d4af37, #f1c40f, #d4af37),
                        linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)
                      `,
                      boxShadow: `
                        0 10px 30px rgba(212, 175, 55, 0.3),
                        0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                        0 2px 10px rgba(0, 0, 0, 0.2)
                      `
                    }}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      {registerMutation.isPending ? (
                        <>
                          <motion.div
                            className="w-6 h-6 border-3 border-navy-900 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Securing Your Spot...</span>
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Rocket className="w-6 h-6" />
                          </motion.div>
                          <span>
                            Secure My VIP Seat - {registrationType === "individual" ? "R249" : "R1000"}
                          </span>
                          <ArrowRight className="w-6 h-6" />
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Gift className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Zap className="w-5 h-5 text-gold-500" />
                    <span className="text-sm">Instant Access</span>
                  </div>
                </div>

                {/* Contact Support */}
                <p className="text-center text-gray-400 text-sm">
                  Need help? Contact us at{" "}
                  <a href="mailto:summaryautomations@gmail.com" className="text-gold-500 hover:underline">
                    summaryautomations@gmail.com
                  </a>
                </p>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
