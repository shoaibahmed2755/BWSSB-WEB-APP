
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import Layout from "@/components/layout/Layout";

// Mock data for water usage
const usageData = [
  { month: "Jan", usage: 12000, average: 9500 },
  { month: "Feb", usage: 11000, average: 9500 },
  { month: "Mar", usage: 14000, average: 9500 },
  { month: "Apr", usage: 16000, average: 9500 },
  { month: "May", usage: 18000, average: 9500 },
  { month: "Jun", usage: 15000, average: 9500 },
  { month: "Jul", usage: 10000, average: 9500 },
  { month: "Aug", usage: 9000, average: 9500 },
  { month: "Sep", usage: 8000, average: 9500 },
  { month: "Oct", usage: 10000, average: 9500 },
  { month: "Nov", usage: 11000, average: 9500 },
  { month: "Dec", usage: 13000, average: 9500 },
];

// Mock data for water tanker bookings by day
const weeklyBookingsData = [
  { day: "Monday", bookings: 45 },
  { day: "Tuesday", bookings: 38 },
  { day: "Wednesday", bookings: 52 },
  { day: "Thursday", bookings: 41 },
  { day: "Friday", bookings: 48 },
  { day: "Saturday", bookings: 62 },
  { day: "Sunday", bookings: 35 },
];

// Mock data for eco stats
const ecoData = {
  waterSaved: 156000, // liters
  carbonReduced: 2340, // kg
  treesEquivalent: 105,
};

// Mock data for water source distribution
const waterSourceData = [
  { name: "Borewells", value: 35 },
  { name: "Reservoirs", value: 40 },
  { name: "Rainwater Harvesting", value: 15 },
  { name: "Recycled Water", value: 10 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll generate some random data based on the bookings in localStorage
        const bookings = JSON.parse(localStorage.getItem("bwssb_bookings") || "[]");
        
        // If there are no bookings, use the mock data
        if (bookings.length === 0) {
          setUserData(usageData);
        } else {
          // Process the bookings to create usage data
          const processedData = usageData.map(month => {
            const variance = Math.floor(Math.random() * 3000) - 1500;
            return {
              ...month,
              usage: month.usage + variance,
            };
          });
          setUserData(processedData);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        // Use mock data as fallback
        setUserData(usageData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const totalUsage = userData.reduce((sum, item) => sum + item.usage, 0);
  const averageUsage = Math.round(totalUsage / userData.length);
  
  // Calculate peak month
  const peakUsageMonth = userData.reduce(
    (max, item) => (item.usage > max.usage ? item : max),
    { month: "", usage: 0 }
  );

  // Calculate water savings
  const calculateWaterSavings = () => {
    const baselineUsage = 12 * 12000; // Assuming baseline of 12,000L per month
    const actualUsage = totalUsage;
    return baselineUsage - actualUsage;
  };

  const waterSavings = calculateWaterSavings();
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Water Usage Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Track and analyze your water consumption patterns
            </p>
          </div>

          <div className="flex justify-end">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Water Usage</CardTitle>
                <CardDescription>
                  {timeRange === "month" ? "Last 30 days" : timeRange === "quarter" ? "Last 90 days" : "Last 12 months"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatNumber(totalUsage)} L</div>
                <p className="text-sm text-muted-foreground mt-2">
                  {waterSavings > 0 ? (
                    <span className="text-green-500">
                      {formatNumber(waterSavings)} liters less
                    </span>
                  ) : (
                    <span className="text-red-500">
                      {formatNumber(Math.abs(waterSavings))} liters more
                    </span>
                  )}{" "}
                  than average
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Monthly Usage</CardTitle>
                <CardDescription>
                  Based on your consumption patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatNumber(averageUsage)} L</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Peak month: {peakUsageMonth.month} ({formatNumber(peakUsageMonth.usage)} L)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Eco Impact</CardTitle>
                <CardDescription>
                  Environmental savings from efficient use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatNumber(ecoData.carbonReduced)} kg</div>
                <p className="text-sm text-muted-foreground mt-2">
                  CO₂ emissions reduced, equivalent to {ecoData.treesEquivalent} trees
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="usage" className="space-y-4">
            <TabsList>
              <TabsTrigger value="usage">Usage Trends</TabsTrigger>
              <TabsTrigger value="bookings">Booking Patterns</TabsTrigger>
              <TabsTrigger value="sources">Water Sources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Water Consumption</CardTitle>
                  <CardDescription>
                    Your water usage compared to community average
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[400px]">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <p>Loading data...</p>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={userData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="usage" 
                            stroke="#0089d6" 
                            name="Your Usage (L)"
                            strokeWidth={2}
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="average" 
                            stroke="#8884d8" 
                            name="Community Average (L)"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Booking Patterns</CardTitle>
                  <CardDescription>
                    Number of tanker bookings by day of the week
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyBookingsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="bookings" 
                          name="Number of Bookings" 
                          fill="#1ab0fb" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Water Source Distribution</CardTitle>
                  <CardDescription>
                    Where your water comes from in Bangalore
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={waterSourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {waterSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Water Conservation Insights</h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              Based on your usage patterns, here are some water-saving recommendations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-green-700 dark:text-green-400">
              <li>Consider installing a rainwater harvesting system - save up to 40% on water usage</li>
              <li>Fix leaking taps - a dripping tap can waste up to 20,000 liters annually</li>
              <li>Install water-efficient fixtures - reduce consumption by up to 50%</li>
              <li>Schedule tanker deliveries during non-peak hours for faster service</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
