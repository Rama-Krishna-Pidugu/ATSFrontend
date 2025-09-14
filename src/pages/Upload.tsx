import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { mockCandidates } from "@/lib/mock-data";
import { Upload } from "lucide-react";
import { getApiUrl, API_CONFIG } from "@/config/api";
import { createFetchWithAuth } from "@/lib/api-utils";
import { useAuthToken } from "@/hooks/use-auth-token";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CandidateResponse {
  name: string;
  skills: string[];
  experience: string;
  education: string;
  contact: {
    email: string;
    phone: string;
  };
  summary: string;
  location?: string;
}

const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [parsedCandidates, setParsedCandidates] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const { getAuthHeaders } = useAuthToken();
  const fetchWithAuth = createFetchWithAuth(getAuthHeaders);

  // Fetch all parsed resumes when component mounts
  useEffect(() => {
    fetchParsedResumes();
  }, []);

  // Function to fetch all parsed resumes from API
  const fetchParsedResumes = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(getApiUrl(API_CONFIG.ENDPOINTS.RESUMES));
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      let responseData = await response.json();
      console.log('API Response:', responseData);
      console.log('Number of resumes:', responseData.length);
      
      // Check if number of resumes exceeds the free tier limit
      if (responseData.length > 10) {
        console.log('Showing limit dialog');
        setShowLimitDialog(true);
        // Only show first 10 resumes
        responseData = responseData.slice(0, 10);
      }
      
      // Transform the data to match the expected format
      const formattedCandidates = responseData.map((candidate: CandidateResponse) => ({
        id: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: candidate.name,
        skills: candidate.skills,
        experience: candidate.experience,
        location: candidate.location || "Not specified",
        education: candidate.education,
        contact: candidate.contact,
        summary: candidate.summary
      }));
      
      setParsedCandidates(formattedCandidates);
      toast.success("Successfully loaded parsed resumes");
    } catch (error) {
      console.error("Failed to fetch parsed resumes:", error);
      toast.error("Failed to load parsed resumes. Using sample data instead.");
      // Fallback to mock data
      setParsedCandidates(mockCandidates.slice(0, 3));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (parsedCandidates.length < 10) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (parsedCandidates.length >= 10) {
      setShowLimitDialog(true);
      return;
    }
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf" || 
             file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    } else {
      toast.error("Please upload PDF or DOCX files only.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parsedCandidates.length >= 10) {
      setShowLimitDialog(true);
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf" || 
               file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      
      if (selectedFiles.length > 0) {
        handleFileUpload(selectedFiles);
      } else {
        toast.error("Please upload PDF or DOCX files only.");
      }
    }
  };

  const uploadSingleFile = async (file: File) => {
    try {
      // Update progress for this file
      setUploadProgress(prev => ({...prev, [file.name]: 0}));

      const formData = new FormData();
      formData.append('file', file, file.name);
      
      // Get the auth token
      const token = await getAuthHeaders().then(headers => headers['Authorization'].split(' ')[1]);
      
      // API call with real endpoint
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_RESUME), {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[file.name] || 0;
          if (currentProgress < 90) {
            return {...prev, [file.name]: currentProgress + 10};
          }
          return prev;
        });
      }, 200);
      
      if (!response.ok) {
        clearInterval(progressInterval);
        const errorData = await response.json();
        throw new Error(errorData.detail?.[0]?.msg || `Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Complete the progress
      setUploadProgress(prev => ({...prev, [file.name]: 100}));
      clearInterval(progressInterval);
      
      toast.success(`Successfully parsed: ${file.name}`);
      return data;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      toast.error(`Failed to upload: ${file.name}`);
      return null;
    }
  };
  
  const handleFileUpload = async (filesToUpload: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...filesToUpload]);
    setIsUploading(true);
    
    const results = [];
    
    // Process files one by one
    for (const file of filesToUpload) {
      const result = await uploadSingleFile(file);
      if (result) {
        results.push({
          id: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: result.name,
          skills: result.skills,
          experience: result.experience,
          location: result.location || "Not specified", 
          education: result.education,
          contact: result.contact,
          summary: result.summary
        });
      }
    }
    
    setIsUploading(false);
    
    if (results.length > 0) {
      setParsedCandidates(prev => [...results, ...prev]);
      toast.success(`${results.length} resume${results.length > 1 ? 's' : ''} successfully parsed!`);
      // Refresh the list of parsed resumes
      fetchParsedResumes();
    }
    
    setUploadProgress({});
  };

  const loadSampleResumes = () => {
    if (parsedCandidates.length >= 10) {
      setShowLimitDialog(true);
      return;
    }

    setIsUploading(true);
    
    // Simulate loading sample resumes
    setTimeout(() => {
      setIsUploading(false);
      setParsedCandidates(mockCandidates);
      toast.success("Sample resumes loaded successfully!");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Upload Resumes</h1>
          <p className="text-gray-600 text-lg">
            Upload candidate resumes in PDF or DOCX format for AI-powered parsing
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>
              {parsedCandidates.length >= 10 
                ? "Free tier limit reached. Upgrade to upload more resumes."
                : "Drag and drop your files or click to browse"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } ${parsedCandidates.length >= 10 ? "opacity-50 cursor-not-allowed" : ""} transition-colors duration-200`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <Upload className={`h-8 w-8 ${parsedCandidates.length >= 10 ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <h3 className="text-lg font-medium">
                {parsedCandidates.length >= 10 
                  ? "Free tier limit reached"
                  : "Drag and drop your resume files"}
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {parsedCandidates.length >= 10 
                  ? "Upgrade to upload more resumes"
                  : "Support for PDF, DOCX"}
              </p>
              <input
                type="file"
                id="fileUpload"
                multiple
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="hidden"
                disabled={parsedCandidates.length >= 10}
              />
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  onClick={() => document.getElementById("fileUpload")?.click()}
                  variant="outline"
                  disabled={isUploading || parsedCandidates.length >= 10}
                >
                  Browse Files
                </Button>
                <Button
                  onClick={loadSampleResumes}
                  variant="outline"
                  disabled={isUploading || parsedCandidates.length >= 10}
                >
                  Test with Sample Resumes
                </Button>
              </div>
            </div>

            {/* Show upload progress if any files are being processed */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Upload Progress</h3>
                <div className="space-y-3">
                  {Object.entries(uploadProgress).map(([fileName, progress]) => (
                    <div key={fileName} className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{fileName}</span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-recruiter-primary h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(isUploading || isLoading) && Object.keys(uploadProgress).length === 0 && (
              <div className="mt-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-gray-600">
                  {isUploading ? "Processing resumes..." : "Loading parsed resumes..."}
                </p>
              </div>
            )}

            {parsedCandidates.length > 0 && !isUploading && !isLoading && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Parsed Candidates</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedCandidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell className="font-medium">{candidate.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 3).map((skill: string) => (
                                <span 
                                  key={skill} 
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {skill}
                                </span>
                              ))}
                              {candidate.skills.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{candidate.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{candidate.experience}</TableCell>
                          <TableCell>{candidate.location}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Parsed
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button asChild>
                    <a href="/search">Continue to Search</a>
                  </Button>
                </div>
              </div>
            )}

            {parsedCandidates.length === 0 && !isLoading && !isUploading && (
              <div className="mt-8 text-center py-8">
                <p className="text-gray-500">No resumes found. Upload resumes to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Free Tier Limit Reached</DialogTitle>
              <DialogDescription>
                You have reached the free tier limit of 10 resumes. Upgrade to our premium plan to upload and process more resumes.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLimitDialog(false)}>
                Continue with Free Tier
              </Button>
              <Button onClick={() => window.location.href = '/pricing'}>
                Upgrade Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadPage;
