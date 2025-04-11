
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { User, Map, CreditCard, Heart, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AddressForm {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const ProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const profileForm = useForm<ProfileForm>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
    },
  });
  
  const addressForm = useForm<AddressForm>({
    defaultValues: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  });

  const onProfileSubmit = (data: ProfileForm) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  const onAddressSubmit = (data: AddressForm) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Address updated successfully");
    }, 1000);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Your Profile</h1>
        <p className="text-gray-600">Manage your account details and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <User className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="font-medium text-lg">John Doe</h2>
              <p className="text-gray-500 text-sm">Member since April 2025</p>
            </div>
            
            <nav className="space-y-1">
              <Link to="/orders" className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                <Package className="h-5 w-5 mr-3 text-purple-600" />
                <span>Orders</span>
              </Link>
              <Link to="/profile" className="flex items-center p-2 bg-purple-50 text-purple-700 rounded-md">
                <User className="h-5 w-5 mr-3 text-purple-600" />
                <span>Profile</span>
              </Link>
              <Link to="/wishlist" className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                <Heart className="h-5 w-5 mr-3 text-purple-600" />
                <span>Wishlist</span>
              </Link>
              <Link to="/payment-methods" className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                <CreditCard className="h-5 w-5 mr-3 text-purple-600" />
                <span>Payment Methods</span>
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal" className="flex items-center">
                  <User className="h-4 w-4 mr-2" /> Personal Info
                </TabsTrigger>
                <TabsTrigger value="address" className="flex items-center">
                  <Map className="h-4 w-4 mr-2" /> Address
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="address">
                <Form {...addressForm}>
                  <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                    <FormField
                      control={addressForm.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addressForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={addressForm.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP/Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={addressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Address"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
