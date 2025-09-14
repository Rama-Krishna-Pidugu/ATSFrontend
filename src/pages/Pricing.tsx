import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, MessageSquare } from 'lucide-react';
import FeedbackDialog from '@/components/feedback/FeedbackDialog';
import ContactPopup from '@/components/ContactPopup';

const Pricing = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handlePlanClick = () => {
    setShowContactPopup(true);
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "3 resume uploads",
        "Basic search filters",
        "Standard support",
        "Basic candidate profiles"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Premier",
      price: "₹6,000",
      period: "/month",
      description: "Ideal for growing teams",
      features: [
        "Unlimited resume uploads",
        "Advanced search & filters",
        "Email outreach tools",
        "Candidate ranking",
        "Priority support",
        "Export capabilities"
      ],
      buttonText: "Choose Premier",
      popular: true
    },
    {
      name: "Elite",
      price: "₹15,000",
      period: "/month",
      description: "For enterprise-level hiring",
      features: [
        "Everything in Premier",
        "Team collaboration",
        "ATS integration",
        "Custom branding",
        "Advanced analytics",
        "Dedicated account manager",
        "API access"
      ],
      buttonText: "Choose Elite",
      popular: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Choose Your <span className="gradient-text">Perfect Plan</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Scale your recruitment with AI-powered tools. Start free and upgrade as you grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-lg font-normal text-gray-500">{plan.period}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                onClick={handlePlanClick}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Need something different? Have questions about our plans?
        </p>
        <Button 
          variant="outline" 
          onClick={() => setShowFeedback(true)}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Share Feedback
        </Button>
      </div>

      <FeedbackDialog 
        open={showFeedback} 
        onOpenChange={setShowFeedback} 
      />

      <ContactPopup 
        open={showContactPopup} 
        onOpenChange={setShowContactPopup} 
      />
    </div>
  );
};

export default Pricing;
