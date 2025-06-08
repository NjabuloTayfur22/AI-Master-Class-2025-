import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Copy, MessageCircle, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/hooks/useCurrency";

export default function BankPayment() {
  const { toast } = useToast();
  const currencyCtx = useCurrency();
  const currency = currencyCtx?.currency || 'ZAR';
  const convert = currencyCtx?.convert || ((v: number) => v);
  const getSymbol = currencyCtx?.getSymbol || ((c: string) => 'R');
  const loading = currencyCtx?.loading || false;

  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    transactionId: "",
    transferAmount: "",
    bankTransferDate: "",
    planType: ""
  });

  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setRegistrationData(parsed);
        const selectedPlan = parsed.selectedPlan || 'elite'; // Default to elite if not specified
        setFormData(prev => ({
          ...prev,
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          country: parsed.country || "",
          planType: selectedPlan,
          transferAmount: selectedPlan === 'premium' ? "1000" : "249"
        }));
      } catch (error) {
        console.error('Error parsing registration data:', error);
      }
    }
  }, []);

  // Company bank details
  const bankDetails = {
    bankName: "The Currency Cloud Limited",
    accountName: "SARANSH DHARMESH CHAURASIA",
    accountNumber: "GB85TCCL04140482834907",
    branchCode: "E1 6FQ",
    swiftCode: "TCCLGB3L",
    bankAddress: "12 Steward Street, The Steward Building, London, E1 6FQ, GB",
    reference: `SUMA-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  };

  const planDetails = {
    elite: {
      title: "ELITE ACCESS",
      priceZAR: 249,
      features: [
        "3-hour elite transformation intensive",
        "Personalized empire-building blueprint",
        "Luxury landing page mastery workshop",
        "AI-powered business domination tactics",
        "Exclusive platinum resource vault",
        "VIP follow-up mentorship session"
      ]
    },
    premium: {
      title: "PREMIUM MASTERMIND",
      priceZAR: 1000,
      features: [
        "Everything in ELITE ACCESS",
        "Advanced business scaling strategies",
        "1-on-1 personal mentorship session",
        "Priority access to future workshops",
        "Lifetime access to premium resources",
        "Exclusive mastermind community access",
        "Monthly group coaching calls"
      ]
    }
  };

  const handlePlanChange = (plan: 'elite' | 'premium') => {
    setFormData(prev => ({
      ...prev,
      planType: plan,
      transferAmount: plan === 'premium' ? "1000" : "249"
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (priceZAR: number) => {
    return `${getSymbol(currency)}${convert(priceZAR).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const copyBankDetails = () => {
    const currentPlan = formData.planType === 'premium' ? planDetails.premium : planDetails.elite;
    const bankInfo = `Bank Details for Summary Automates

Bank: ${bankDetails.bankName}
Account Name: ${bankDetails.accountName}
Account Number: ${bankDetails.accountNumber}
Branch Code: ${bankDetails.branchCode}
Swift Code: ${bankDetails.swiftCode}
Reference: ${bankDetails.reference}
Amount: ${formatPrice(currentPlan.priceZAR)}

Please use the reference number for your transfer and keep your transaction receipt.`;

    navigator.clipboard.writeText(bankInfo);
    toast({
      title: "Bank Details Copied!",
      description: "Bank details have been copied to your clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.transactionId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.transactionId.length < 6) {
      toast({
        title: "Invalid Transaction ID",
        description: "Transaction ID must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    const currentPlan = formData.planType === 'premium' ? planDetails.premium : planDetails.elite;
    const expectedAmount = convert(currentPlan.priceZAR);
    const transferAmount = parseFloat(formData.transferAmount);
    
    if (Math.abs(transferAmount - expectedAmount) > 0.01) {
      toast({
        title: "Amount Mismatch",
        description: `Transfer amount must be exactly ${formatPrice(currentPlan.priceZAR)}`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const encodedMessage = encodeURIComponent(
        `Hi! I've made a bank transfer for the ${formatPrice(currentPlan.priceZAR)} ${currentPlan.title} masterclass.

My Payment Details:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Transaction ID: ${formData.transactionId}
Transfer Date: ${formData.bankTransferDate || 'Today'}
Reference: ${bankDetails.reference}

I've attached my payment screenshot. Please confirm receipt and activate my enrollment.

Thank you!`
      );

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/919373395733?text=${encodedMessage}`, '_blank');
      
      toast({
        title: "Payment Verification Started",
        description: "Please complete the verification in WhatsApp by sending your payment screenshot.",
        duration: 8000,
      });
      
      // Payment verification is handled in the previous block
      
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "There was an issue processing your verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPlan = formData.planType === 'premium' ? planDetails.premium : planDetails.elite;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-slate-900/20" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Registration
          </motion.button>

          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">SECURE YOUR</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">VIP SEAT</span>
          </motion.h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Complete your payment via bank transfer and get instant access
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Personal Information */}
            {registrationData && (
              <Card className="bg-black/20 border-yellow-400/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Registration Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Name:</span> {registrationData.firstName} {registrationData.lastName}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Email:</span> {registrationData.email}
                    </p>
                    {registrationData.phone && (
                      <p className="text-gray-300">
                        <span className="text-gray-400">Phone:</span> {registrationData.phone}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bank Transfer Details */}
            <Card className="bg-black/20 border-green-400/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Building2 className="mr-2 text-green-400" />
                  Bank Transfer Details
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Transfer funds to our account using these details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Selection */}
                <div className="flex space-x-4 mb-4">
                  <Button
                    type="button"
                    onClick={() => handlePlanChange('elite')}
                    className={`flex-1 ${
                      formData.planType === 'elite'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-black/20 text-yellow-400'
                    }`}
                  >
                    Elite Access - R249
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handlePlanChange('premium')}
                    className={`flex-1 ${
                      formData.planType === 'premium'
                        ? 'bg-purple-400 text-black'
                        : 'bg-black/20 text-purple-400'
                    }`}
                  >
                    Premium Mastermind - R1000
                  </Button>
                </div>

                <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-green-400 font-semibold text-lg">Our Bank Details</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyBankDetails}
                      className="border-green-400/50 text-green-400 hover:bg-green-400/10"
                    >
                      <Copy className="mr-2" size={16} />
                      Copy Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Bank Name:</span>
                      <p className="text-white font-mono">{bankDetails.bankName}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Account Holder Name:</span>
                      <p className="text-white font-mono">{bankDetails.accountName}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Account Number (IBAN):</span>
                      <p className="text-white font-mono text-lg font-bold">{bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">SWIFT/BIC Code:</span>
                      <p className="text-white font-mono">{bankDetails.swiftCode}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Bank Address:</span>
                      <p className="text-white font-mono">{bankDetails.bankAddress}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Reference:</span>
                      <p className="text-yellow-400 font-mono font-bold">{bankDetails.reference}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-400/30 rounded">
                    <p className="text-yellow-400 font-semibold">
                      Amount to Transfer: {loading ? '...' : formatPrice(currentPlan.priceZAR)}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      Please use the reference number above for your transfer
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Your bank may apply conversion fees if you pay in a currency other than ZAR.
                    </p>
                  </div>
                </div>

                {/* Payment Verification Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-white font-semibold">Payment Verification</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="+1 555 000 0000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="transactionId" className="text-gray-300">Transaction ID / Reference Number *</Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="Enter your transaction ID"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Find this on your bank transfer receipt
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="transferAmount" className="text-gray-300">Amount Transferred *</Label>
                      <Input
                        id="transferAmount"
                        name="transferAmount"
                        value={formData.transferAmount}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        placeholder="249"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankTransferDate" className="text-gray-300">Transfer Date</Label>
                      <Input
                        id="bankTransferDate"
                        name="bankTransferDate"
                        type="date"
                        value={formData.bankTransferDate}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 text-white"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold text-lg py-6 tracking-wide hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                        Verifying Payment...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <CheckCircle className="mr-2" size={20} />
                        VERIFY PAYMENT - {loading ? '...' : formatPrice(currentPlan.priceZAR)}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary & Instructions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Plan Summary */}
            <Card className="bg-black/20 border-yellow-400/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">{currentPlan.title}</h3>
                    <span className="text-2xl font-bold text-yellow-400">
                      {loading ? '...' : formatPrice(currentPlan.priceZAR)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {currentPlan.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-300">
                        <CheckCircle size={14} className="mr-2 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-blue-900/20 border-blue-400/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-blue-400">Payment Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                  <li>Copy the bank details above and make your transfer</li>
                  <li>Use the provided reference number</li>
                  <li>Enter your transaction ID and details</li>
                  <li>Click "Verify Payment"</li>
                  <li>Share your payment screenshot via WhatsApp or email</li>
                  <li>Get instant access within 30 minutes</li>
                </ol>
              </CardContent>
            </Card>                {/* Contact Information */}
            <Card className="bg-green-900/20 border-green-400/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <MessageCircle className="text-green-400" size={20} />
                  Send Payment Screenshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment Verification WhatsApp */}
                <Button
                  onClick={() => window.open(`https://wa.me/919373395733`, '_blank')}
                  variant="ghost"
                  className="w-full flex items-center space-x-3 hover:bg-green-400/10 transition-colors"
                >
                  <MessageCircle className="text-green-400" size={20} />
                  <div className="flex-1">
                    <p className="text-white font-semibold">Payment Verification WhatsApp</p>
                    <p className="text-green-300 text-sm">+91 937 339 5733</p>
                    <p className="text-xs text-gray-400">Send your payment proof here for instant verification</p>
                  </div>
                </Button>
                
                {/* Support WhatsApp */}
                <Button
                  onClick={() => window.open(`https://wa.me/27123456789`, '_blank')}
                  variant="ghost"
                  className="w-full flex items-center space-x-3 hover:bg-blue-400/10 transition-colors"
                >
                  <MessageCircle className="text-blue-400" size={20} />
                  <div className="flex-1">
                    <p className="text-white font-semibold">24/7 Support WhatsApp</p>
                    <p className="text-blue-300 text-sm">+27 123 456 789</p>
                    <p className="text-xs text-gray-400">For general inquiries and technical support</p>
                  </div>
                </Button>
                
                {/* Email Contact */}
                <Button
                  onClick={() => window.open(`mailto:summaryautomations@gmail.com`, '_blank')}
                  variant="ghost"
                  className="w-full flex items-center space-x-3 hover:bg-green-400/10 transition-colors"
                >
                  <Mail className="text-green-400" size={20} />
                  <div className="flex-1">
                    <p className="text-white font-semibold">Alternative Contact</p>
                    <p className="text-green-300 text-sm">summaryautomations@gmail.com</p>
                    <p className="text-xs text-gray-400">Email your payment proof if WhatsApp is unavailable</p>
                  </div>
                </Button>
                <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
                  <p className="text-yellow-400 text-sm font-semibold">Quick Response!</p>
                  <p className="text-gray-300 text-xs mt-1">
                    We verify payments and send invoices within 30 minutes during business hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
