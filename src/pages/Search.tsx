import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import { mockCandidates as mockCandidatesOriginal } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";
import { getApiUrl, API_CONFIG } from "@/config/api";
import { createFetchWithAuth } from "@/lib/api-utils";
import { useAuthToken } from "@/hooks/use-auth-token";

interface Contact {
  email: string;
  phone: string;
}

interface Candidate {
  id: number;
  name: string;
  skills: string[];
  experience: string;
  education: string;
  contact: Contact;
  summary: string;
  similarity_score: number;
  matchScore?: number; // For backward compatibility
  location?: string; // For backward compatibility
}

interface SearchResponse {
  id: number;
  name: string;
  skills: string[];
  experience: string;
  education: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  similarity_score: number;
}

const TalentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"grid" | "table">("grid");
  const [analysis, setAnalysis] = useState<string>("");
  const { getAuthHeaders } = useAuthToken();
  const fetchWithAuth = createFetchWithAuth(getAuthHeaders);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      
      try {
        const response = await fetchWithAuth(getApiUrl(API_CONFIG.ENDPOINTS.SEARCH), {
          method: 'POST',
          body: JSON.stringify({
            query: searchQuery,
            location: null,
            experience_years: null
          })
        });
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const data: SearchResponse[] = await response.json();
        console.log(data);
        
        // Process and set the search results
        const candidates = data.map(candidate => ({
          ...candidate,
          // For backward compatibility with existing UI
          matchScore: Math.round(candidate.similarity_score * 100)
        }));
        
        setSearchResults(candidates);
      } catch (error) {
        console.error("Search failed:", error);
        toast({
          title: "Search failed",
          description: "Please try again later",
          variant: "destructive",
        });
        // Fallback to mock data
        setSearchResults(mockCandidatesOriginal);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  // Apply filters to search results
  const filteredResults = activeFilters.length > 0
    ? searchResults.filter(candidate => {
        return activeFilters.some(filter => {
          // Check if candidate matches the filter criteria
          if (candidate.skills.includes(filter)) return true;
          if (candidate.location === filter) return true;
          if (filter === "5+ years" && candidate.experience.includes("5") || 
              parseInt(candidate.experience) >= 5) return true;
          return false;
        });
      })
    : searchResults;

  // Extract all unique skills from search results for filters
  const availableSkills = searchResults.length > 0 
    ? Array.from(new Set(searchResults.flatMap(candidate => candidate.skills))).slice(0, 8)
    : ["React", "Node.js", "TypeScript", "Python", "Django"];

  // Extract locations for filters
  const locations = searchResults.length > 0
    ? Array.from(new Set(searchResults.filter(c => c.location).map(c => c.location as string)))
    : ["Bangalore", "Mumbai"];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Smart Talent Search</h1>
          <p className="text-gray-600 text-lg">
            Find the perfect candidates using natural language search
          </p>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Find React developers in Bangalore with 5+ years experience"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-lg"
                />
              </div>
              <Button type="submit" disabled={isSearching} size="lg">
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  <span>Search</span>
                )}
              </Button>
            </div>
          </form>

          {searchQuery && !isSearching && searchResults.length === 0 && (
            <div className="mt-8 text-center py-12 border border-dashed rounded-md">
              <p className="text-gray-600">No candidates found matching your search criteria.</p>
            </div>
          )}
        </div>

        {filteredResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">Filters:</span>
                {[...availableSkills, ...locations, "5+ years"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.includes(filter)
                        ? "bg-recruiter-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-colors`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">View:</span>
                <Tabs value={viewType} className="w-24">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger 
                      value="grid" 
                      onClick={() => setViewType("grid")}
                      className={viewType === "grid" ? "data-[state=active]:bg-recruiter-primary data-[state=active]:text-white" : ""}
                    >
                      Grid
                    </TabsTrigger>
                    <TabsTrigger 
                      value="table" 
                      onClick={() => setViewType("table")}
                      className={viewType === "table" ? "data-[state=active]:bg-recruiter-primary data-[state=active]:text-white" : ""}
                    >
                      Table
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {analysis && (
              <Card className="mb-6 bg-slate-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Analysis</h3>
                  <div className="text-sm text-slate-700 whitespace-pre-line">
                    {analysis}
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue={viewType} className="w-full" value={viewType}>
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((candidate) => (
                    <Card key={candidate.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{candidate.name}</h3>
                              <p className="text-gray-600">{candidate.location || "Remote"}</p>
                            </div>
                            <div className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium">
                              {candidate.matchScore || Math.round(candidate.similarity_score * 100)}%
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {candidate.skills.slice(0, 5).map((skill) => (
                                <span 
                                  key={skill} 
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                    ${searchQuery.toLowerCase().includes(skill.toLowerCase())
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Experience:</span> {candidate.experience}
                            </p>
                          </div>
                        </div>
                        
                        <div className="border-t px-6 py-3 bg-gray-50 flex justify-end">
                          <Button variant="link" size="sm" asChild>
                            <Link to={`/candidates/${candidate.id}`}>
                              View Profile <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="table" className="mt-0">
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Skills
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Years Exp
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank Score
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredResults.map((candidate) => (
                        <tr key={candidate.id}>
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
                            {candidate.location || "Remote"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {candidate.experience}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-medium inline-block">
                              {candidate.matchScore || Math.round(candidate.similarity_score * 100)}%
                            </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentSearch;
