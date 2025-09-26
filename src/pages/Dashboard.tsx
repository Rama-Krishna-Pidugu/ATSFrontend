
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, LineChart, Line, RadialBarChart, RadialBar
} from "recharts";
import { getApiUrl, API_CONFIG } from "@/config/api";
import { createFetchWithAuth } from "@/lib/api-utils";
import { useAuthToken } from "@/hooks/use-auth-token";
import { skillDistribution, experienceDistribution, locationDistribution, skillGaps } from "@/lib/mock-data";

// Enhanced color palette matching the reference design
const COLORS = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', '#4895ef', '#560bad', '#b5179e', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
const GRADIENT_COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];

// Technology tags for the header
const TECH_TAGS = [
  'Node.js', 'Git', 'MongoDB', 'MySQL', 'Data Structures & Algorithms', 'C#', 'VB.Net', 'C', 'C++',
  '.Net Framework 4.0/4.5', 'ASP.Net', 'ASP.NET MVC', 'ADO.Net', 'Entity Framework', 'AJAX', 'Web Service',
  'LINQ', 'JQuery', 'Bootstrap CSS', 'SQL', 'MySql', 'Windows', 'Tortoise SVN', 'GitHub', 'Microsoft Word',
  'Excel', 'Access', 'Power point', 'Automation Expertise', 'Performance Get insights into you',
  'Design Principles', 'Software Updates', 'QA Testing', 'Source and Version Control: Git, Github',
  'Strong Interpersonal and Communication Skills', 'Software Experience Validation', 'Code and Quality Standards',
  'Object-Oriented Programming', 'Teamwork and Collaboration', 'Performance Evaluation and Optimization',
  'Data Structures and Algorithms', 'Programming Languages: Java, C#, .Net, Python', 'API Design and Development',
  'Analytical Thinking and Problem Solving', 'Agile/Scrum Methodology', 'Software Components and Libraries',
  'Database Oracle/MongoDB', 'Project Oversight', 'Conceptual Designing', 'Usability Understanding',
  'REST APIs', 'SOAP APIs', 'Object-oriented programming'
];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { getAuthHeaders } = useAuthToken();
  const fetchWithAuth = createFetchWithAuth(getAuthHeaders);

  // Data for the LineChart
  const skillDemandData = [
    { name: "React", data: [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 35 },
      { month: "Mar", value: 45 },
      { month: "Apr", value: 60 },
      { month: "May", value: 70 },
      { month: "Jun", value: 65 },
    ]},
    { name: "Angular", data: [
      { month: "Jan", value: 50 },
      { month: "Feb", value: 45 },
      { month: "Mar", value: 40 },
      { month: "Apr", value: 30 },
      { month: "May", value: 35 },
      { month: "Jun", value: 40 },
    ]},
    { name: "TypeScript", data: [
      { month: "Jan", value: 20 },
      { month: "Feb", value: 30 },
      { month: "Mar", value: 35 },
      { month: "Apr", value: 45 },
      { month: "May", value: 55 },
      { month: "Jun", value: 60 },
    ]},
  ];

  // Months array for X-axis
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const response = await fetchWithAuth(getApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD_METRICS));
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
      }
    };

    fetchDashboardMetrics();
  }, []);

  if (!dashboardData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl">Loading dashboard metrics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Talent Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Get insights into your talent pool with AI-powered analytics
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.total_candidates}</div>
              <p className="text-xs text-green-600 mt-1">↑ 12% increase this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.average_experience} years</div>
              <p className="text-xs text-gray-500 mt-1">Across all candidates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Top Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.top_location}</div>
              <p className="text-xs text-gray-500 mt-1">{dashboardData.top_location_percentage}% of candidates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Top Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dashboardData.top_skill}</div>
              <p className="text-xs text-gray-500 mt-1">{dashboardData.top_skill_percentage}% of candidates</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skills Distribution */}
          
          
          {/* Experience Distribution */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Experience Distribution</CardTitle>
              <CardDescription>
                Candidate count by years of experience
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData.experience_distribution || []}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4361ee" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Location Distribution */}
         
          
          {/* Skill Demand Trends (Fixed version) */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Skill Demand Trends</CardTitle>
              <CardDescription>
                How demand has changed over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      type="category"
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      data={skillDemandData[0].data}
                      type="monotone"
                      dataKey="value"
                      name="React"
                      stroke="#4361ee"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      data={skillDemandData[1].data}
                      type="monotone"
                      dataKey="value"
                      name="Angular"
                      stroke="#f72585"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      data={skillDemandData[2].data}
                      type="monotone"
                      dataKey="value"
                      name="TypeScript"
                      stroke="#4cc9f0"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Skill Gaps Section */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Gaps Analysis</CardTitle>
            <CardDescription>
              Insights from the AI to help improve your talent acquisition strategy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(dashboardData.skill_gaps || []).map((gap, index) => (
                <div key={index} className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                  <p className="text-amber-800">{gap}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Consider upskilling in Docker</h4>
                  <p className="text-sm text-gray-600">
                    Based on your talent pool, consider arranging Docker training sessions for your DevOps candidates.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Target Next.js developers</h4>
                  <p className="text-sm text-gray-600">
                    Next.js skills are in high demand but low supply in your talent pool. Consider targeted recruitment.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2">Cloud skills are valuable</h4>
                  <p className="text-sm text-gray-600">
                    Candidates with cloud infrastructure experience are more valuable. Look for AWS, Azure, or GCP certifications.
                  </p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg">
                  <h4 className="font-medium mb-2">Consider GraphQL training</h4>
                  <p className="text-sm text-gray-600">
                    GraphQL skills are becoming increasingly important for full-stack roles. Only 20% of your candidates have experience.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
