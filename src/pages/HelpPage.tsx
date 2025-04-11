
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const HelpPage: React.FC = () => {
  const [messages, setMessages] = useState<{type: "user" | "support"; text: string}[]>([
    {type: "support", text: "Hello! How can I help you today?"}
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    // Add user message
    setMessages([...messages, {type: "user", text: newMessage}]);
    
    // Clear input
    setNewMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "support", 
        text: "Thanks for your message! Our team will get back to you shortly."
      }]);
    }, 1000);
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, browse our collections, select your desired products, add them to your cart, and proceed to checkout. Follow the payment process, and you'll receive an order confirmation email once completed."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept wire transfers, credit/debit cards, and mobile money payments. Wire transfer is our recommended payment method."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been shipped, you'll receive a tracking number via email. You can also check your order status by visiting your Orders page in your account dashboard."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery. Items must be in original condition with tags attached. Please contact our customer service team to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination country and local customs processing."
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions or chat with our support team.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="text-xl font-medium mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">How to Place an Order</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Browse our collections and find products you love</li>
                <li>Select your desired size, color, and quantity</li>
                <li>Add items to your shopping cart</li>
                <li>Review your cart and proceed to checkout</li>
                <li>Enter your shipping and billing information</li>
                <li>Choose your preferred payment method</li>
                <li>Complete your order and wait for confirmation</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden h-[600px] flex flex-col">
            <div className="bg-purple-600 p-4 text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h2 className="font-medium">Chat with Support</h2>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user" 
                        ? "bg-purple-100 text-purple-900" 
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.type === "support" && (
                      <div className="flex items-center mb-1">
                        <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center mr-1">
                          <span className="text-white text-xs">S</span>
                        </div>
                        <span className="text-xs font-medium">Support</span>
                      </div>
                    )}
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
              <Textarea 
                placeholder="Type your message here..." 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] flex-1 resize-none"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-purple-600 hover:bg-purple-700 h-[60px] w-[60px]"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          <div className="mt-6 bg-purple-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Contact Information</h3>
            <p className="text-sm text-gray-700 mb-2">
              Email: support@theculturing.com
            </p>
            <p className="text-sm text-gray-700">
              Phone: +1 (234) 567-8901
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
