import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/contexts/StoreContext";
import { ArrowRight, Smartphone, QrCode } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { getAuthUser, getCurrentOrderId } from "@/lib/AuthCookieManager";

const PaymentPage: React.FC = () => {
  const { cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"airtel" | "momo">("airtel");
  const [isProcessing, setIsProcessing] = useState(false);
  const { pRef } = useParams();
  const { cTotal } = useParams();

  const qrCodes: Record<string, string> = {
    airtel: "/qrcodes/airtel.png",
    momo: "/qrcodes/momo.png",
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      transactionId: "",
    },
  });

  const merchantCodes: Record<string, string> = {
    airtel: "959208",
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
        merchantCodeUsed: merchantCodes[paymentMethod],
      };

      const res = await axios.post("https://api.suavemusicpr.com/api/v1/payments", body);

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
          Select your preferred payment method, view the details, then share
          your transaction ID for verification.
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

                      {/* QR only for Airtel & MoMo */}
                      {qrCodes[method.id] && (
                        <div className="mt-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="flex items-center gap-2 text-sm px-3 py-2 border rounded-md hover:bg-gray-100 transition">
                                <QrCode className="h-4 w-4 text-gray-600" />
                                View QR Code
                              </button>
                            </DialogTrigger>
                            <DialogContent className="p-6 flex flex-col items-center">
                              <h3 className="text-lg font-semibold mb-3">
                                {method.label} QR
                              </h3>
                              <img
                                src={qrCodes[method.id]}
                                alt={`${method.label} QR`}
                                className="w-64 h-64 rounded-lg border"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
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

        {/* Order Summary */}
        {/* <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{cartTotal.toFixed(2)} UGX</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>0 UGX</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2 border-t pt-2">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)} UGX</span>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default PaymentPage;
