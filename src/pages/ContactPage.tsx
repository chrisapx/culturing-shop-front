
import React, { useState } from "react";
import { toast } from "sonner";
import Layout from "@/components/Layout/Layout";
import { Instagram, Twitter, Phone } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: ""
    });
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-culturing-DEFAULT"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-culturing-DEFAULT"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-culturing-DEFAULT"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Custom Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Briefly state your inquiry, feedback, or query."
                className="w-full border border-gray-300 px-3 py-2 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-culturing-DEFAULT"
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
        
        <div>
          <div className="bg-white border border-gray-200 p-6 h-full">
            <h2 className="text-xl font-medium mb-6">Connect With Us</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Twitter className="h-5 w-5 mr-4 text-culturing-DEFAULT" />
                <div>
                  <p className="text-sm text-culturing-gray">X (Twitter)</p>
                  <a 
                    href="https://twitter.com/theculturing_" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-culturing-DEFAULT hover:underline"
                  >
                    @theculturing_
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <Instagram className="h-5 w-5 mr-4 text-culturing-DEFAULT" />
                <div>
                  <p className="text-sm text-culturing-gray">Instagram</p>
                  <a 
                    href="https://instagram.com/theculturingea" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-culturing-DEFAULT hover:underline"
                  >
                    @theculturingea
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-4 text-culturing-DEFAULT" />
                <div>
                  <p className="text-sm text-culturing-gray">Phone</p>
                  <a 
                    href="tel:+256761334247" 
                    className="text-culturing-DEFAULT hover:underline"
                  >
                    +256761334247
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Business Hours</h3>
              <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
