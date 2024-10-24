"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailForm from "./EmailForm";
import OtpForm from "./OtpForm";

interface LoginModalProps {
  authenticate: (token: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ authenticate }) => {
  const [emailSent, setEmailSent] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)]">
          Se connecter
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription asChild>
            {!emailSent ? (
              <EmailForm
                onEmailSubmit={(submittedEmail: string) =>
                  setEmailSent(submittedEmail)
                }
              />
            ) : (
              <OtpForm email={emailSent} authenticate={authenticate} />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
