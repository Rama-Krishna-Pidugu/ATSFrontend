import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import { getApiUrl, API_CONFIG } from "@/config/api";
import { createFetchWithAuth } from "@/lib/api-utils";
import { useAuthToken } from "@/hooks/use-auth-token";

interface Contact {
  email: string;
  phone: string;
  location?: string;
}

interface Candidate {
  id: number;
  name: string;
  skills: string[];
  experience: string;
  education: string;
  contact: Contact;
  summary: string;
}

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "table">("grid");
  const { getAuthHeaders } = useAuthToken();
  const fetchWithAuth = createFetchWithAuth(getAuthHeaders);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetchWithAuth(getApiUrl(API_CONFIG.ENDPOINTS.RESUMES));
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const data: Candidate[] = await response.json();
        setCandidates(data);
        setFilteredCandidates(data);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candidate.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCandidates(filtered);
    } else {
      setFilteredCandidates(candidates);
    }
  }, [searchQuery, candidates]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <div className="mt-4">Loading candidates...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">All Candidates</h1>
          <p className="text-gray-600 text-lg">
            Browse and manage your talent pool
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "table")}>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Candidates Display */}
        <Tabs value={viewType} className="w-full">
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.experience}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/candidates/${candidate.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{candidate.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 line-clamp-3">
                      {candidate.summary}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{candidate.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.experience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.contact.location || "Remote"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button variant="link" size="sm" asChild>
                          <Link to={`/candidates/${candidate.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
