
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Bell, ChartBar, Clock, MapPin, Calendar, Droplet, User, Settings } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [userZone, setUserZone] = useState("north");
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [zoneStatus, setZoneStatus] = useState<{[key: string]: string}>({
    north: "Normal",
    south: "Shortage",
    east: "Normal",
    west: "Alert",
    central: "Normal",
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("bwssb_user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));

      // Generate a random zone for the user if not set
      const zones = ["north", "south", "east", "west", "central"];
      const randomZone = zones[Math.floor(Math.random() * zones.length)];
      setUserZone(randomZone);

      // Get bookings from localStorage
      const bookings = JSON.parse(localStorage.getItem("bwssb_bookings") || "[]");
      setRecentBookings(bookings.slice(0, 3));
    }

    // Show notification on first load
    toast({
      title: "Welcome to BWSSB Tanker Connect",
      description: "Book water tankers and manage your water needs easily.",
    });
  }, [toast]);

  // Mock next delivery
  const nextDelivery = {
    id: "BWS1234",
    date: new Date(),
    timeSlot: "10:00 AM - 12:00 PM",
    tankSize: "5000",
    status: "Scheduled",
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getZoneStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "shortage":
        return "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100";
      case "alert":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-bwssb-600 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-bwssb-700 to-bwssb-500 opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              BWSSB Tanker Connect
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl md:mx-0 mx-auto">
              Fast, reliable water tanker delivery services for Bangalore residents. Book online and track your delivery in real-time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to="/book">
                <Button size="lg" className="bg-white text-bwssb-600 hover:bg-gray-100">
                  Book a Tanker
                </Button>
              </Link>
              <Link to="/reports">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Check Water Quality
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decorative element */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 70"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,42.7C840,43,960,53,1080,48C1200,43,1320,21,1380,10.7L1440,0L1440,70L1380,70C1320,70,1200,70,1080,70C960,70,840,70,720,70C600,70,480,70,360,70C240,70,120,70,60,70L0,70Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book water tankers online with just a few clicks. Choose your preferred time slots and tank sizes.
              </p>
            </div>
            
            <div className="bg-cyan-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Regular Subscriptions</h3>
              <p className="text-gray-600">
                Set up recurring deliveries with our subscription plans and never worry about running out of water.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Water Quality Reports</h3>
              <p className="text-gray-600">
                Access real-time water quality data for different zones across Bangalore city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section (when logged in) */}
      {user && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Welcome, {user.name || user.email}</h2>
                <p className="text-gray-600">Here's your water management dashboard</p>
              </div>
              <Link to="/book">
                <Button className="mt-4 md:mt-0">
                  <Bell className="mr-2 h-4 w-4" /> Book New Tanker
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-bwssb-600" />
                    <CardTitle>Your Water Zone</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold capitalize">{userZone} Zone</p>
                      <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                    </div>
                    <Badge className={getZoneStatusColor(zoneStatus[userZone])}>
                      {zoneStatus[userZone]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-bwssb-600" />
                    <CardTitle>Next Delivery</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentBookings.length > 0 ? (
                    <div>
                      <p className="text-lg font-bold">#{recentBookings[0].id}</p>
                      <p className="text-sm">
                        {new Date(recentBookings[0].date).toLocaleDateString()} | {recentBookings[0].timeSlot}
                      </p>
                      <Badge className={getStatusColor(recentBookings[0].status)}>
                        {recentBookings[0].status}
                      </Badge>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-500">No upcoming deliveries</p>
                      <Link to="/book" className="text-sm text-bwssb-600 hover:underline">
                        Schedule a delivery
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <ChartBar className="h-5 w-5 mr-2 text-bwssb-600" />
                    <CardTitle>Water Usage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">12,500 L</p>
                  <p className="text-sm text-gray-500">Last 30 days</p>
                  <Link to="/analytics" className="text-sm text-bwssb-600 hover:underline">
                    View detailed analytics
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your tanker booking history</CardDescription>
              </CardHeader>
              <CardContent>
                {recentBookings.length > 0 ? (
                  <div className="divide-y">
                    {recentBookings.map((booking, index) => (
                      <div key={index} className="py-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium">Booking #{booking.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString()} | {booking.timeSlot}
                          </p>
                          <p className="text-xs text-gray-400">
                            {booking.tankSize}L tanker • {booking.address}
                          </p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No booking history found</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Bookings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      )}

      {/* CTAs for Non-Logged-in Users */}
      {!user && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Start Managing Your Water Needs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <User className="h-6 w-6 mr-2 text-bwssb-600" />
                    <CardTitle>Create an Account</CardTitle>
                  </div>
                  <CardDescription>
                    Register to access all features of BWSSB Tanker Connect
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Benefits of creating an account:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Book water tankers with saved addresses</li>
                    <li>Track your water usage and expenses</li>
                    <li>Set up recurring deliveries with subscriptions</li>
                    <li>Receive notifications about your deliveries</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/register" className="w-full">
                    <Button className="w-full">Register Now</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Settings className="h-6 w-6 mr-2 text-bwssb-600" />
                    <CardTitle>Already Have an Account?</CardTitle>
                  </div>
                  <CardDescription>
                    Log in to access your dashboard and manage your water services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Access your personal dashboard to manage bookings, check water quality in your area, and view your usage analytics.
                  </p>
                  <p className="text-gray-600">
                    If you're a new user, you'll need to create an account first.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full">Login to Your Account</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Water Quality Alert Map */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Bangalore Water Zone Status</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Check current water supply status across different zones in Bangalore
          </p>
          
          <div className="relative max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden">
            {/* Map Image Placeholder */}
            <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center">
              <div className="w-full h-full p-4 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Basic outline of Bangalore */}
                  <path d="M200,100 Q300,50 400,100 Q500,150 600,100 Q650,150 600,250 Q550,350 400,400 Q250,350 200,250 Q150,150 200,100" 
                    fill="#e0f7ff" stroke="#0089d6" strokeWidth="2" />
                  
                  {/* North Zone */}
                  <path d="M300,100 Q350,120 400,100 Q420,150 400,200 Q350,220 300,200 Q280,150 300,100" 
                    fill={zoneStatus.north === "Normal" ? "#90ee90" : zoneStatus.north === "Shortage" ? "#ffcc80" : "#ff8080"} 
                    stroke="#333" strokeWidth="1" />
                  <text x="350" y="150" textAnchor="middle" className="text-xl font-semibold">North</text>
                  
                  {/* South Zone */}
                  <path d="M350,220 Q400,240 450,220 Q470,270 450,320 Q400,340 350,320 Q330,270 350,220" 
                    fill={zoneStatus.south === "Normal" ? "#90ee90" : zoneStatus.south === "Shortage" ? "#ffcc80" : "#ff8080"} 
                    stroke="#333" strokeWidth="1" />
                  <text x="400" y="280" textAnchor="middle" className="text-xl font-semibold">South</text>
                  
                  {/* East Zone */}
                  <path d="M450,120 Q500,100 550,120 Q570,170 550,220 Q500,240 450,220 Q430,170 450,120" 
                    fill={zoneStatus.east === "Normal" ? "#90ee90" : zoneStatus.east === "Shortage" ? "#ffcc80" : "#ff8080"} 
                    stroke="#333" strokeWidth="1" />
                  <text x="500" y="170" textAnchor="middle" className="text-xl font-semibold">East</text>
                  
                  {/* West Zone */}
                  <path d="M250,120 Q300,100 350,120 Q370,170 350,220 Q300,240 250,220 Q230,170 250,120" 
                    fill={zoneStatus.west === "Normal" ? "#90ee90" : zoneStatus.west === "Shortage" ? "#ffcc80" : "#ff8080"} 
                    stroke="#333" strokeWidth="1" />
                  <text x="300" y="170" textAnchor="middle" className="text-xl font-semibold">West</text>
                  
                  {/* Central Zone */}
                  <circle cx="400" cy="200" r="50" 
                    fill={zoneStatus.central === "Normal" ? "#90ee90" : zoneStatus.central === "Shortage" ? "#ffcc80" : "#ff8080"} 
                    stroke="#333" strokeWidth="1" />
                  <text x="400" y="200" textAnchor="middle" className="text-xl font-semibold">Central</text>
                </svg>
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
                  <div className="flex items-center mb-1">
                    <div className="w-4 h-4 bg-green-300 mr-2"></div>
                    <span className="text-sm">Normal</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-4 h-4 bg-orange-200 mr-2"></div>
                    <span className="text-sm">Shortage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-200 mr-2"></div>
                    <span className="text-sm">Alert</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-700 text-sm">
                <strong>Note:</strong> This map shows the current water supply status. Areas marked in red may experience delays in tanker delivery.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/reports">
              <Button>
                Check Detailed Water Reports
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                      <span className="text-blue-800 font-bold">RP</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Rahul Patel</p>
                    <p className="text-gray-500">HSR Layout</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The tanker booking process is so easy now! I can quickly schedule a delivery and track its status. Great service by BWSSB."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                      <span className="text-green-800 font-bold">AS</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Ananya Sharma</p>
                    <p className="text-gray-500">Whitefield</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I love the subscription feature! I've set up bi-weekly deliveries and haven't had to worry about water shortages since."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
                      <span className="text-amber-800 font-bold">MK</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-medium">Mohammed Khan</p>
                    <p className="text-gray-500">Jayanagar</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The water quality reports help me make informed decisions. Our apartment complex now uses the rainwater harvesting program too."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
