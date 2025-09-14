import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getScreeningQuestions, getOutreachTemplate } from "@/lib/mock-data";
import { ArrowLeft, Send, Calendar, MessageSquare, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getApiUrl } from "@/config/api";
import { createFetchWithAuth } from "@/lib/api-utils";
import { useAuthToken } from "@/hooks/use-auth-token";

interface Contact {
  email: string;
  phone: string;
  location: string;
}

interface Education {
  degree: string;
  year: string | null;
  institution: string | null;
}

interface Certification {
  name: string;
  issuing_organization: string | null;
  year: string | null;
}

interface EducationInfo {
  details: Education[];
  certifications: Certification[];
}

interface WorkExperience {
  summary: string;
  details: any[];
}

interface BasicInfo {
  id: number;
  first_name: string;
  full_name: string;
  experience_years: string;
  summary: string;
}

interface Candidate {
  basic_info: BasicInfo;
  contact_info: Contact;
  skills: string[];
  education: EducationInfo;
  work_experience: WorkExperience;
  created_at: string;
}

const CandidateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [screeningQuestions, setScreeningQuestions] = useState<string[]>([]);
  const [outreachEmail, setOutreachEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [emailType, setEmailType] = useState<"initial" | "interview" | "congratulations" | "regret">("initial");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const { getAuthHeaders } = useAuthToken();
  const fetchWithAuth = createFetchWithAuth(getAuthHeaders);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetchWithAuth(getApiUrl(`search/resume/${id}/`));

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCandidate(data);
        setScreeningQuestions(getScreeningQuestions(data.skills));
        
        // Convert API response to match the expected format for outreach template
        const outreachFormat = {
          id: data.basic_info.id,
          name: data.basic_info.full_name,
          skills: data.skills,
          experience: data.basic_info.experience_years,
          education: data.education.details.map(edu => edu.degree).join(", "),
          contact: data.contact_info,
          summary: data.basic_info.summary,
          similarity_score: 0.8 // Default value since it's not in the API response
        };
        setOutreachEmail(getOutreachTemplate(outreachFormat));
      } catch (error) {
        console.error("Failed to fetch candidate details:", error);
        toast.error("Failed to load candidate details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCandidateDetails();
    }
  }, [id]);

  const handleSendEmail = () => {
    setIsSending(true);
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      toast.success(`${emailType === "initial" ? "Outreach" : emailType.charAt(0).toUpperCase() + emailType.slice(1)} email sent successfully!`);
    }, 1500);
  };

  const getEmailTemplate = (type: string) => {
    if (!candidate) return "";
    
    switch (type) {
      case "interview":
        return `Dear ${candidate.basic_info.full_name},

We were impressed by your experience and skills, and we would like to invite you for an interview on ${scheduledDate} at ${scheduledTime}.

Please let us know if this time works for you. If not, please suggest alternative dates and times.

Looking forward to speaking with you!

Best regards,
AI Recruiter
PeopleGPT`;
      
      case "congratulations":
        return `Dear ${candidate.basic_info.full_name},

Congratulations! We are pleased to inform you that you have successfully passed our interview process.

We would like to move forward with the next steps. Our team will be in touch shortly to discuss the details.

Best regards,
AI Recruiter
PeopleGPT`;
      
      case "regret":
        return `Dear ${candidate.basic_info.full_name},

Thank you for your interest in our company and for taking the time to interview with us.

After careful consideration, we have decided to proceed with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in our company and wish you the best in your job search.

Best regards,
AI Recruiter
PeopleGPT`;
      
      default:
        return getOutreachTemplate(candidate);
    }
  };

  const switchEmailType = (type: "initial" | "interview" | "congratulations" | "regret") => {
    setEmailType(type);
    setOutreachEmail(getEmailTemplate(type));
  };

  const updateInterviewTemplate = () => {
    if (emailType === "interview") {
      setOutreachEmail(getEmailTemplate("interview"));
    }
  };

  useEffect(() => {
    if (emailType === "interview") {
      updateInterviewTemplate();
    }
  }, [scheduledDate, scheduledTime]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto flex items-center justify-center py-20">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
            <p className="text-gray-600 mb-6">The candidate you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link to="/search">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/search"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search Results
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{candidate.basic_info.full_name}</h1>
              <p className="text-gray-600">{candidate.contact_info.location} • {candidate.basic_info.experience_years}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium">
                Match Score: 80%
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-recruiter-primary data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="screening" className="data-[state=active]:bg-recruiter-primary data-[state=active]:text-white">
              AI Screening
            </TabsTrigger>
            <TabsTrigger value="outreach" className="data-[state=active]:bg-recruiter-primary data-[state=active]:text-white">
              Outreach
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{candidate.contact_info.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{candidate.contact_info.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{candidate.contact_info.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{candidate.basic_info.summary}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.education.details.map((edu, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          {edu.institution && (
                            <p className="text-gray-600">{edu.institution}</p>
                          )}
                          {edu.year && (
                            <p className="text-gray-600">{edu.year}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {candidate.education.certifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {candidate.education.certifications.map((cert, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                          >
                            {cert.name}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="screening" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Screening Questions</CardTitle>
                <CardDescription>
                  These questions are generated based on {candidate.basic_info.full_name}'s skills and experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {screeningQuestions.map((question, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-medium text-lg mb-2">Question {index + 1}</h3>
                      <p className="text-gray-800">{question}</p>
                      <div className="mt-3 flex justify-end">
                        <Button variant="ghost" size="sm">
                          Edit Question
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">
                    Add Custom Question
                  </Button>
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-medium text-lg mb-4">Interview Notes</h3>
                  <Textarea 
                    placeholder="Add your interview notes here..."
                    className="min-h-[150px]"
                  />
                  <div className="mt-4 flex justify-end">
                    <Button>Save Notes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="outreach" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Emails</CardTitle>
                <CardDescription>
                  Choose the type of email you want to send to {candidate.basic_info.full_name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button 
                      variant={emailType === "initial" ? "default" : "outline"}
                      onClick={() => switchEmailType("initial")}
                      className="flex gap-2 items-center"
                    >
                      <Mail className="h-4 w-4" />
                      Initial Outreach
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant={emailType === "interview" ? "default" : "outline"}
                          className="flex gap-2 items-center"
                        >
                          <Calendar className="h-4 w-4" />
                          Interview Invitation
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Schedule Interview</DialogTitle>
                          <DialogDescription>
                            Set the date and time for the interview
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="interview-date" className="text-right">
                              Date
                            </label>
                            <Input
                              id="interview-date"
                              type="date"
                              value={scheduledDate}
                              onChange={(e) => setScheduledDate(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="interview-time" className="text-right">
                              Time
                            </label>
                            <Input
                              id="interview-time"
                              type="time"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={() => {
                              switchEmailType("interview");
                            }}
                          >
                            Create Email
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant={emailType === "congratulations" ? "default" : "outline"}
                      onClick={() => switchEmailType("congratulations")}
                      className="flex gap-2 items-center"
                    >
                      <MailOpen className="h-4 w-4" />
                      Congratulations
                    </Button>
                    
                    <Button 
                      variant={emailType === "regret" ? "default" : "outline"}
                      onClick={() => switchEmailType("regret")}
                      className="flex gap-2 items-center"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Regret
                    </Button>
                  </div>
                  
                  <div className="p-6 border rounded-lg bg-white">
                    <div className="mb-4 space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">To:</span>
                        <span className="ml-2 font-medium">{candidate.contact_info.email}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Subject:</span>
                        <span className="ml-2 font-medium">
                          {emailType === "initial" && `Exciting opportunity for ${candidate.skills[0]} developer`}
                          {emailType === "interview" && `Interview Invitation: ${candidate.skills[0]} Position`}
                          {emailType === "congratulations" && `Congratulations on Your Interview Success`}
                          {emailType === "regret" && `Regarding Your Recent Application`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 whitespace-pre-line">
                      <Textarea
                        value={outreachEmail}
                        onChange={(e) => setOutreachEmail(e.target.value)}
                        className="min-h-[300px] border-none p-0 focus-visible:ring-0 resize-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button variant="outline">
                    Save Template
                  </Button>
                  <Button 
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="flex items-center gap-2"
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Email</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CandidateDetail;
