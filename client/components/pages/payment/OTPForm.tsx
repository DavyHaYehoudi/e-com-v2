import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OTPFormValues, otpSchema } from "./schema/otpSchema";

const OTPForm = ({ onSubmit }: { onSubmit: (data: OTPFormValues) => void }) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* OTP input */}
      <Label>Entrez votre code </Label>
      <InputOTP
        maxLength={6}
        onChange={(value: string) => setValue("otp", value)}
        className="flex space-x-2"
      >
        <InputOTPGroup className="flex space-x-2">
          <InputOTPSlot index={0} className="w-12 h-12 text-center" />
          <InputOTPSlot index={1} className="w-12 h-12 text-center" />
          <InputOTPSlot index={2} className="w-12 h-12 text-center" />
          <InputOTPSlot index={3} className="w-12 h-12 text-center" />
          <InputOTPSlot index={4} className="w-12 h-12 text-center" />
          <InputOTPSlot index={5} className="w-12 h-12 text-center" />
        </InputOTPGroup>
      </InputOTP>
      {errors.otp && <p className="text-red-600">{errors.otp.message}</p>}

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white uppercase"
      >
        Valider
      </Button>
    </form>
  );
};

export default OTPForm;
