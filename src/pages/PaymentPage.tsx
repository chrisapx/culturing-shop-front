import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/contexts/StoreContext";
import { ArrowRight, Smartphone } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";
import { getAuthUser, getCurrentOrderId } from "@/lib/AuthCookieManager";
import { API_BASE_URL } from "@/lib/config";

const PaymentPage: React.FC = () => {
  const { cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"airtel" | "momo">("airtel");
  const [isProcessing, setIsProcessing] = useState(false);
  const { pRef } = useParams();
  const { cTotal } = useParams();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      transactionId: "",
    },
  });

  const merchantCodes: Record<string, string> = {
    airtel: "6851287",
    momo: "959208",
  };

  const onSubmit = async (data: any) => {
    try {
      setIsProcessing(true);

      const body = {
        customerId: getAuthUser()?.userId ?? "",
        paymentRef: pRef ?? "",
        amount: cTotal,
        paymentMethod,
        fullNames: data.name,
        accountNumberUsed: "",
        mobileNumberUsed: data?.email,
        merchantCodeUsed: merchantCodes[paymentMethod] || "",
      };

      const res = await axios.post(`${API_BASE_URL}/api/v1/payments`, body);

      toast.success("Payment submitted successfully!");
      clearCart();
      navigate("/orders");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const methods = [
    {
      id: "airtel",
      label: "Airtel Pay",
      icon: <Smartphone className="h-5 w-5 mr-2 text-red-500" />,
      details: (
        <>
          Merchant Code: {merchantCodes.airtel} <br />
          Account Name: The Culturing Ltd <br />
        </>
      ),
    },
    {
      id: "momo",
      label: "MTN MoMo Pay",
      icon: <Smartphone className="h-5 w-5 mr-2 text-yellow-500" />,
      details: (
        <>
          Merchant Code: {merchantCodes.momo} <br />
          Account Name: The Culturing Ltd <br />
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Complete Your Payment</h1>
        <p className="text-gray-600">
          Select your preferred payment method and enter your transaction ID for verification.
        </p>
      </div>

      <div className="text-lg text-green-700 pb-5">Pay Ush {Number(cTotal).toLocaleString()}</div>

      <div className="">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-xl font-medium mb-6">Payment Method</h2>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(value: any) => setPaymentMethod(value)}
              className="space-y-4"
            >
              {methods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-md transition-all duration-300 ${
                    paymentMethod === method.id
                      ? "border-[#5fa9af] bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center p-4 cursor-pointer">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="mr-3"
                    />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center text-base font-medium"
                    >
                      {method.icon}
                      {method.label}
                    </Label>
                  </div>

                  {/* Expanded details */}
                  {paymentMethod === method.id && (
                    <div className="px-6 pb-4 text-sm text-gray-700 animate-fadeIn">
                      {method.details}
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>

            {/* Payment Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
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
                      <FormLabel>Phone number used</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the number used to pay"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction ID/Reference</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter transaction ID or reference"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
      </div>
    </Layout>
  );
};

export default PaymentPage;
