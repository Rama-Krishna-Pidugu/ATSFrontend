
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface ContactPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactPopup = ({ open, onOpenChange }: ContactPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Thank You for Your Interest!</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Our team will get back to you soon with more details about your selected plan and help you get started.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button onClick={() => onOpenChange(false)} className="px-8">
            Got It
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;