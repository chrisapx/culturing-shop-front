
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/contexts/StoreContext";
import { Shield, CreditCard, Smartphone, ArrowRight, CheckCircle, BanknoteIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const PaymentPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"wire" | "card" | "mobile">("wire");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      transactionId: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment processed successfully!");
      clearCart();
      navigate("/orders");
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Complete Your Payment</h1>
        <p className="text-gray-600">Please select your preferred payment method.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-xl font-medium mb-6">Payment Method</h2>
            
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={(value: any) => setPaymentMethod(value)}
              className="space-y-4"
            >
                <p className="text-[#5fa9af] text-sm">To make payment, send the money to any of these bank or mobile money details and share with us the transaction ID for verification.
                  Loking forward to working with you.
                </p>
              <div className={`flex items-start space-x-3 border p-4 rounded-md ${paymentMethod === "wire" ? "border-[#5fa9af] bg-blue-50" : "border-gray-200"}`}>
                <RadioGroupItem value="wire" id="wire" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="wire" className="flex items-center text-base font-medium">
                    <BanknoteIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Wire Transfer
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Send payment to:<br />
                    Account Name: The Culturing Ltd<br />
                    Account Number: 0123456789<br />
                    Bank: Example Bank<br />
                    Reference: Your order number
                  </p>
                </div>
              </div>
              
              <div className={`hidden flex items-start space-x-3 border p-4 rounded-md ${paymentMethod === "card" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                <RadioGroupItem value="card" id="card" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="card" className="flex items-center text-base font-medium">
                    <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                    Credit/Debit Card
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Securely pay with your credit or debit card.
                  </p>
                </div>
              </div>
              
              <div className={`hidden flex items-start space-x-3 border p-4 rounded-md ${paymentMethod === "mobile" ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                <RadioGroupItem value="mobile" id="mobile" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="mobile" className="flex items-center text-base font-medium">
                    <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
                    Mobile Money
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay using mobile money services.<br />
                    Mobile Money Number: +123 456 7890
                  </p>
                </div>
              </div>
            </RadioGroup>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {paymentMethod === "wire" && (
                  <FormField
                    control={form.control}
                    name="transactionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction ID/Reference</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter transaction ID or reference" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="mt-6">
                  <button 
                    type="submit" 
                    className="btn-primary w-full flex items-center justify-center bg-[#5fa9af] hover:bg-[#4a8f96] text-white font-semibold py-3 rounded-md transition-colors duration-200"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        Complete Payment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between font-semibold mb-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-md">
            <div className="flex items-start mb-3">
              <Shield className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Secure Payments</h3>
                <p className="text-sm text-gray-600">Your payment information is encrypted and secure.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Protected by The Culturing</h3>
                <p className="text-sm text-gray-600">Your data is protected under our privacy policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
