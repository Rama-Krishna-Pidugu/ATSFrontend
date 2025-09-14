
import React from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileUp, Search, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnauthenticatedApp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-recruiter-background">
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="font-bold text-xl">
            <span className="gradient-text">People</span>GPT
          </div>
          
          <div className="flex items-center gap-3">
            <SignInButton>
              <Button variant="outline" size="sm">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="flex flex-col items-center">
          {/* Hero Section */}
          <section className="w-full hero-gradient-bg py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Recruit smarter. <span className="gradient-text">PeopleGPT</span> screens, ranks, and reaches out for you—in seconds.
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Harness the power of AI to transform your recruitment process. Upload resumes, find the perfect candidates, and contact them automatically.
                </p>
                <div className="pt-4">
                  <SignInButton>
                    <Button size="lg" className="bg-recruiter-primary hover:bg-recruiter-primary/90">
                      Try Now for Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignInButton>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Cards Section */}
          <section className="py-12 container mx-auto px-4 -mt-16">
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 mx-auto">
                  <FileUp className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Upload Resumes</h3>
                <p className="text-gray-600 text-sm">Process and analyze candidate resumes</p>
                <div className="mt-4">
                  <SignInButton>
                    <Button size="sm" variant="outline">Try Now</Button>
                  </SignInButton>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 mx-auto">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Search Talent</h3>
                <p className="text-gray-600 text-sm">Find candidates using semantic search</p>
                <div className="mt-4">
                  <SignInButton>
                    <Button size="sm" variant="outline">Try Now</Button>
                  </SignInButton>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-12 w-12 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 mb-4 mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Candidates</h3>
                <p className="text-gray-600 text-sm">Manage and review all candidates</p>
                <div className="mt-4">
                  <SignInButton>
                    <Button size="sm" variant="outline">Try Now</Button>
                  </SignInButton>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 mx-auto">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dashboard</h3>
                <p className="text-gray-600 text-sm">View analytics and metrics</p>
                <div className="mt-4">
                  <SignInButton>
                    <Button size="sm" variant="outline">Try Now</Button>
                  </SignInButton>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How it works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                PeopleGPT simplifies the recruitment process with powerful AI-driven features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 card-gradient">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Resume Parsing</h3>
                <p className="text-gray-600">
                  Upload multiple resumes in seconds. Our AI extracts relevant information and structures it for easy search.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 card-gradient">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Semantic Search</h3>
                <p className="text-gray-600">
                  Find the right candidates using natural language queries. "Find React developers in Bangalore with 5+ years experience."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 card-gradient">
                <div className="h-12 w-12 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Screening</h3>
                <p className="text-gray-600">
                  Generate relevant technical questions based on candidate skills. Streamline your screening process.
                </p>
              </div>
            </div>
          </section>

          {/* Demo Video Section */}
          <section className="py-16 bg-gray-50 w-full">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">See PeopleGPT in action</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Watch how our AI-powered platform transforms the recruitment process
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto bg-white p-4 rounded-xl shadow-md">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.loom.com/embed/addcef296a954ae8ad63b083c370cdef?sid=667078ad-da33-43e5-8fd4-6fa6a18e394c"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-recruiter-primary to-recruiter-secondary rounded-xl p-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your recruitment process?</h2>
              <p className="text-lg mb-8">
                Join hundreds of recruiters who are saving time and finding better candidates with PeopleGPT.
              </p>
              <SignInButton>
                <Button size="lg" variant="secondary" className="bg-white text-recruiter-primary hover:bg-gray-100">
                  Start Recruiting with AI <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignInButton>
            </div>
          </section>

          {/* About Team Section */}
          <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet the team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're a team of recruiters, developers, and AI enthusiasts passionate about transforming the recruitment industry
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Alex Johnson</h3>
                <p className="text-gray-600">CEO & Co-founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Sarah Chen</h3>
                <p className="text-gray-600">CTO & AI Lead</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Michael Rodriguez</h3>
                <p className="text-gray-600">Head of Recruitment</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-8 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl">
                <span className="gradient-text">People</span>GPT
              </div>
              <p className="text-gray-500 text-sm mt-1">
                AI-powered recruitment platform
              </p>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 PeopleGPT. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UnauthenticatedApp;
