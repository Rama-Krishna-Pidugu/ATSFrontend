import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MainOption = 'features' | 'expensive' | 'existing-tool' | 'no-screening' | 'other';

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState<'main' | 'branch'>('main');
  const [selectedOption, setSelectedOption] = useState<MainOption | ''>('');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleMainOptionSelect = (option: MainOption) => {
    setSelectedOption(option);
    setCurrentStep('branch');
    setFormData({});
  };

  const handleBack = () => {
    setCurrentStep('main');
    setSelectedOption('');
    setFormData({});
  };

  const handleSubmit = () => {
    console.log('Feedback submitted:', { option: selectedOption, data: formData });
    onOpenChange(false);
    // Reset form
    setCurrentStep('main');
    setSelectedOption('');
    setFormData({});
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderMainQuestion = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">What's stopping you from getting started?</h3>
      <div className="space-y-3">
        {[
          { id: 'features', label: 'I need this but I want more features', emoji: '🟢' },
          { id: 'expensive', label: 'Too expensive', emoji: '🔵' },
          { id: 'existing-tool', label: 'We already use a tool for this', emoji: '🟠' },
          { id: 'no-screening', label: "We don't do resume screening", emoji: '🔴' },
          { id: 'other', label: 'Other', emoji: '⚪' }
        ].map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="w-full justify-start text-left h-auto py-3"
            onClick={() => handleMainOptionSelect(option.id as MainOption)}
          >
            <span className="mr-2">{option.emoji}</span>
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderBranchForm = () => {
    switch (selectedOption) {
      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <Label>What features are you looking for? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Team collaboration', 'Candidate tagging', 'ATS integration', 'Advanced filters', 'Candidate ranking', 'Other'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features?.includes(feature)}
                      onCheckedChange={(checked) => {
                        const current = formData.features || [];
                        if (checked) {
                          updateFormData('features', [...current, feature]);
                        } else {
                          updateFormData('features', current.filter((f: string) => f !== feature));
                        }
                      }}
                    />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Would you like early access to new features?</Label>
              <RadioGroup
                value={formData.earlyAccess || ''}
                onValueChange={(value) => updateFormData('earlyAccess', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                maxLength={256}
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'expensive':
        return (
          <div className="space-y-4">
            <div>
              <Label>What price range feels fair to you?</Label>
              <RadioGroup
                value={formData.priceRange || ''}
                onValueChange={(value) => updateFormData('priceRange', value)}
                className="mt-2"
              >
                {['$0–$20/month', '$20–$50/month', '$50–$100/month', 'Only pay per hire'].map((range) => (
                  <div key={range} className="flex items-center space-x-2">
                    <RadioGroupItem value={range} id={range} />
                    <Label htmlFor={range}>{range}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="worthIt">What would make the product feel worth it to you?</Label>
              <Textarea
                id="worthIt"
                value={formData.worthIt || ''}
                onChange={(e) => updateFormData('worthIt', e.target.value)}
                className="mt-1"
                maxLength={256}
              />
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                maxLength={256}
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'existing-tool':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentTool">What tool are you currently using?</Label>
              <Input
                id="currentTool"
                value={formData.currentTool || ''}
                onChange={(e) => updateFormData('currentTool', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="toolStrengths">What does that tool do really well?</Label>
              <Textarea
                id="toolStrengths"
                value={formData.toolStrengths || ''}
                onChange={(e) => updateFormData('toolStrengths', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="toolWeaknesses">What do you wish it did better?</Label>
              <Textarea
                id="toolWeaknesses"
                value={formData.toolWeaknesses || ''}
                onChange={(e) => updateFormData('toolWeaknesses', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                maxLength={256}
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'no-screening':
        return (
          <div className="space-y-4">
            <div>
              <Label>What's your current hiring process? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Referrals', 'Staffing agencies', 'Job boards', 'Technical tests', 'Other'].map((process) => (
                  <div key={process} className="flex items-center space-x-2">
                    <Checkbox
                      id={process}
                      checked={formData.hiringProcess?.includes(process)}
                      onCheckedChange={(checked) => {
                        const current = formData.hiringProcess || [];
                        if (checked) {
                          updateFormData('hiringProcess', [...current, process]);
                        } else {
                          updateFormData('hiringProcess', current.filter((p: string) => p !== process));
                        }
                      }}
                    />
                    <Label htmlFor={process} className="text-sm">{process}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Would an AI screener help if you scaled hiring?</Label>
              <RadioGroup
                value={formData.aiScreenerHelp || ''}
                onValueChange={(value) => updateFormData('aiScreenerHelp', value)}
                className="mt-2"
              >
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                maxLength={256}
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 'other':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="otherFeedback">Can you tell us more?</Label>
              <Textarea
                id="otherFeedback"
                value={formData.otherFeedback || ''}
                onChange={(e) => updateFormData('otherFeedback', e.target.value)}
                className="mt-1"
                maxLength={256}
              />
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                maxLength={256}
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us understand your needs better
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {currentStep === 'main' ? renderMainQuestion() : renderBranchForm()}

          <div className="flex gap-2">
            {currentStep === 'branch' && (
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {currentStep === 'branch' && (
              <Button onClick={handleSubmit} className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                Submit Feedback
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
