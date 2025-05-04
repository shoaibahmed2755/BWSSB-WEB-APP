
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const BookTanker = () => {
  const [user, setUser] = useState<any>(null);
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [formData, setFormData] = useState({
    tankSize: "5000",
    address: "",
    area: "",
    landmark: "",
    pincode: "",
    isEmergency: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated peak hours for the selected date
  const peakHours = ["10:00 AM - 12:00 PM", "4:00 PM - 6:00 PM"];
  
  // Simulated all time slots
  const timeSlots = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  const waterZones = [
    { value: "north", label: "North Zone" },
    { value: "south", label: "South Zone" },
    { value: "east", label: "East Zone" },
    { value: "west", label: "West Zone" },
    { value: "central", label: "Central Zone" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("bwssb_user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isEmergency: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book a tanker.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!date || !timeSlot) {
      toast({
        title: "Incomplete Form",
        description: "Please select a date and time slot.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate a booking ID
      const bookingId = `BWS${Math.floor(Math.random() * 10000)}`;
      
      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem("bwssb_bookings") || "[]");
      const newBooking = {
        id: bookingId,
        ...formData,
        date: date.toISOString(),
        timeSlot,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      bookings.push(newBooking);
      localStorage.setItem("bwssb_bookings", JSON.stringify(bookings));
      
      toast({
        title: "Booking Successful!",
        description: `Your tanker has been booked with ID: ${bookingId}`,
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to book tanker. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isPeakHour = (slot: string) => {
    return peakHours.includes(slot);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Book a Water Tanker</CardTitle>
            <CardDescription>
              Fill in the details below to schedule a water tanker delivery
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Tanker Size</h3>
                  <RadioGroup
                    defaultValue="5000"
                    value={formData.tankSize}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, tankSize: value }))}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5000" id="size-5000" />
                      <Label htmlFor="size-5000">
                        5,000 Liters (₹500)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10000" id="size-10000" />
                      <Label htmlFor="size-10000">
                        10,000 Liters (₹900)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Delivery Address</h3>
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your street address"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">Area/Locality</Label>
                        <Input
                          id="area"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          placeholder="Enter your area/locality"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zone">Water Zone</Label>
                        <Select 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, zone: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select water zone" />
                          </SelectTrigger>
                          <SelectContent>
                            {waterZones.map((zone) => (
                              <SelectItem key={zone.value} value={zone.value}>
                                {zone.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="landmark">Landmark (Optional)</Label>
                        <Input
                          id="landmark"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          placeholder="Any nearby landmark"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Enter 6-digit pincode"
                          required
                          maxLength={6}
                          pattern="[0-9]{6}"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Delivery Date & Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Select Time Slot</Label>
                      <Select onValueChange={setTimeSlot}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot} {isPeakHour(slot) && "⚠️ Peak Hours"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {timeSlot && isPeakHour(timeSlot) && (
                        <p className="text-amber-600 text-sm">
                          ⚠️ This is a peak hour slot. Delivery may be delayed.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergency"
                    checked={formData.isEmergency}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="emergency" className="font-medium text-red-600">
                    This is an emergency request (Priority service, additional ₹200 charge)
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Processing..." : "Book Tanker"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default BookTanker;
