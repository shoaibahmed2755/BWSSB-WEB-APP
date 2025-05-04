
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, Download } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Mock data for water quality reports
const waterQualityData = {
  north: {
    ph: 7.2,
    tds: 320,
    hardness: 180,
    chlorine: 0.7,
    bacteria: "Absent",
    lastUpdated: "2025-04-28",
    status: "Good",
    color: "green",
  },
  south: {
    ph: 6.8,
    tds: 450,
    hardness: 210,
    chlorine: 0.5,
    bacteria: "Absent",
    lastUpdated: "2025-04-27",
    status: "Moderate",
    color: "yellow",
  },
  east: {
    ph: 7.5,
    tds: 280,
    hardness: 150,
    chlorine: 0.8,
    bacteria: "Absent",
    lastUpdated: "2025-04-29",
    status: "Good",
    color: "green",
  },
  west: {
    ph: 6.5,
    tds: 520,
    hardness: 250,
    chlorine: 0.4,
    bacteria: "Present (low)",
    lastUpdated: "2025-04-26",
    status: "Poor",
    color: "red",
  },
  central: {
    ph: 7.0,
    tds: 380,
    hardness: 200,
    chlorine: 0.6,
    bacteria: "Absent",
    lastUpdated: "2025-04-28",
    status: "Good",
    color: "green",
  },
};

// Water contamination reports data
const contaminationReports = [
  {
    id: 1,
    area: "Koramangala",
    zone: "south",
    issue: "Discoloration",
    reportedOn: "2025-04-22",
    status: "Under Investigation",
  },
  {
    id: 2,
    area: "Malleswaram",
    zone: "north",
    issue: "Unusual Smell",
    reportedOn: "2025-04-24",
    status: "Resolved",
  },
  {
    id: 3,
    area: "Whitefield",
    zone: "east",
    issue: "Low Pressure",
    reportedOn: "2025-04-25",
    status: "In Progress",
  },
  {
    id: 4,
    area: "Rajajinagar",
    zone: "west",
    issue: "Contamination",
    reportedOn: "2025-04-26",
    status: "Scheduled",
  },
];

const Reports = () => {
  const [selectedZone, setSelectedZone] = useState("north");
  const [reportType, setReportType] = useState<"table" | "cards">("cards");

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "under investigation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100";
      case "in progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Calculate quality score between 0-100
  const calculateQualityScore = (zone: string) => {
    const data = waterQualityData[zone as keyof typeof waterQualityData];
    
    // Base score out of 100
    let score = 80;
    
    // Adjust based on TDS
    if (data.tds < 300) score += 5;
    else if (data.tds > 450) score -= 10;
    
    // Adjust based on pH
    if (data.ph >= 6.5 && data.ph <= 7.5) score += 5;
    else score -= 5;
    
    // Adjust based on bacteria
    if (data.bacteria.includes("Present")) score -= 15;
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Water Quality Reports</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Check the latest water quality data for different zones in Bangalore
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-64">
              <Select onValueChange={setSelectedZone} defaultValue={selectedZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North Zone</SelectItem>
                  <SelectItem value="south">South Zone</SelectItem>
                  <SelectItem value="east">East Zone</SelectItem>
                  <SelectItem value="west">West Zone</SelectItem>
                  <SelectItem value="central">Central Zone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={reportType === "cards" ? "default" : "outline"}
                onClick={() => setReportType("cards")}
              >
                Card View
              </Button>
              <Button
                variant={reportType === "table" ? "default" : "outline"}
                onClick={() => setReportType("table")}
              >
                Table View
              </Button>
            </div>
          </div>

          <Tabs defaultValue="quality">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quality">Quality Parameters</TabsTrigger>
              <TabsTrigger value="issues">Reported Issues</TabsTrigger>
            </TabsList>
            <TabsContent value="quality">
              {/* Quality Parameters Content */}
              <div className="mt-6">
                {reportType === "cards" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Water Quality Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${
                            calculateQualityScore(selectedZone) > 80 
                              ? "border-green-500" 
                              : calculateQualityScore(selectedZone) > 60 
                                ? "border-amber-500" 
                                : "border-red-500"
                          }`}>
                            <span className="text-3xl font-bold">
                              {calculateQualityScore(selectedZone)}%
                            </span>
                          </div>
                          <p className="mt-4 text-center">
                            {selectedZone.charAt(0).toUpperCase() + selectedZone.slice(1)} Zone
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Last updated: {waterQualityData[selectedZone as keyof typeof waterQualityData].lastUpdated}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">pH Level</CardTitle>
                        <CardDescription>
                          Ideal range: 6.5 - 8.5
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].ph}
                          </span>
                          <Progress 
                            value={(waterQualityData[selectedZone as keyof typeof waterQualityData].ph / 14) * 100} 
                            className="mt-4 h-2 w-48"
                          />
                          <div className="w-48 flex justify-between mt-1">
                            <span className="text-xs">0</span>
                            <span className="text-xs">7</span>
                            <span className="text-xs">14</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">TDS Level</CardTitle>
                        <CardDescription>
                          Total Dissolved Solids (mg/L)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].tds}
                          </span>
                          <div className="mt-2">
                            <Badge className={waterQualityData[selectedZone as keyof typeof waterQualityData].tds < 300 ? "bg-green-500" : waterQualityData[selectedZone as keyof typeof waterQualityData].tds < 500 ? "bg-amber-500" : "bg-red-500"}>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].tds < 300 
                                ? "Excellent" 
                                : waterQualityData[selectedZone as keyof typeof waterQualityData].tds < 500 
                                  ? "Acceptable" 
                                  : "Poor"}
                            </Badge>
                          </div>
                          <p className="mt-3 text-sm text-gray-500">
                            Recommended: &lt;500 mg/L
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Water Hardness</CardTitle>
                        <CardDescription>
                          Calcium carbonate (mg/L)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].hardness}
                          </span>
                          <p className="mt-2">
                            <Badge className={waterQualityData[selectedZone as keyof typeof waterQualityData].hardness < 60 ? "bg-green-500" : waterQualityData[selectedZone as keyof typeof waterQualityData].hardness < 200 ? "bg-blue-500" : "bg-amber-500"}>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].hardness < 60 
                                ? "Soft" 
                                : waterQualityData[selectedZone as keyof typeof waterQualityData].hardness < 200 
                                  ? "Moderately Hard" 
                                  : "Hard"}
                            </Badge>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Residual Chlorine</CardTitle>
                        <CardDescription>
                          Measured in mg/L
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-bold">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine}
                          </span>
                          <p className="mt-3 text-sm text-gray-500">
                            Safe range: 0.2 - 1.0 mg/L
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Bacterial Analysis</CardTitle>
                        <CardDescription>
                          E.coli & Coliform Bacteria
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <span 
                            className={`text-xl font-bold ${
                              waterQualityData[selectedZone as keyof typeof waterQualityData].bacteria.includes("Absent") 
                                ? "text-green-500" 
                                : "text-red-500"
                            }`}
                          >
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].bacteria}
                          </span>
                          <p className="mt-3 text-sm text-gray-500">
                            Safe level: Absent in 100ml sample
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Parameter
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Standard
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            pH Level
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].ph}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            6.5 - 8.5
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={
                              waterQualityData[selectedZone as keyof typeof waterQualityData].ph >= 6.5 && 
                              waterQualityData[selectedZone as keyof typeof waterQualityData].ph <= 8.5 
                                ? "bg-green-500" 
                                : "bg-amber-500"
                            }>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].ph >= 6.5 && 
                               waterQualityData[selectedZone as keyof typeof waterQualityData].ph <= 8.5 
                                ? "Normal" 
                                : "Alert"}
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            Total Dissolved Solids
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].tds} mg/L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            &lt;500 mg/L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={waterQualityData[selectedZone as keyof typeof waterQualityData].tds < 500 ? "bg-green-500" : "bg-red-500"}>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].tds < 500 ? "Normal" : "High"}
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            Hardness
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].hardness} mg/L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            &lt;300 mg/L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={waterQualityData[selectedZone as keyof typeof waterQualityData].hardness < 300 ? "bg-green-500" : "bg-amber-500"}>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].hardness < 300 ? "Normal" : "High"}
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            Residual Chlorine
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine} mg/L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            0.2 - 1.0 mg/L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={
                              waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine >= 0.2 && 
                              waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine <= 1.0 
                                ? "bg-green-500" 
                                : "bg-amber-500"
                            }>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine >= 0.2 && 
                               waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine <= 1.0 
                                ? "Normal" 
                                : waterQualityData[selectedZone as keyof typeof waterQualityData].chlorine < 0.2 
                                  ? "Low" 
                                  : "High"}
                            </Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            Bacterial Analysis
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {waterQualityData[selectedZone as keyof typeof waterQualityData].bacteria}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            Absent in 100ml
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={waterQualityData[selectedZone as keyof typeof waterQualityData].bacteria.includes("Absent") ? "bg-green-500" : "bg-red-500"}>
                              {waterQualityData[selectedZone as keyof typeof waterQualityData].bacteria.includes("Absent") ? "Safe" : "Alert"}
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center">
                  <InfoIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="text-sm text-gray-500">
                    Data is collected and verified by BWSSB daily at multiple sampling points.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Full Report
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="issues">
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Reported Water Issues</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Area
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Zone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Issue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Reported On
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {contaminationReports
                        .filter(report => selectedZone === "all" || report.zone === selectedZone)
                        .map((report) => (
                          <tr key={report.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                              {report.area}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {report.zone.charAt(0).toUpperCase() + report.zone.slice(1)} Zone
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {report.issue}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {report.reportedOn}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      {contaminationReports.filter(report => selectedZone === "all" || report.zone === selectedZone).length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            No issues reported for this zone.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
