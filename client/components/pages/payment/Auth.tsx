// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { AuthFormValues, AuthSchema } from "./schema/authSchema";
// import { Label } from "@/components/ui/label";

// const AuthForm = ({ onSuccess }: { onSuccess: () => void }) => {
//   const [error, setError] = useState("");
//   const [step, setStep] = useState(1); // Étape 1: Email, Étape 2: OTP
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<AuthFormValues>({
//     resolver: zodResolver(AuthSchema),
//   });

//   const handleEmailSubmit = (data: AuthFormValues) => {
//     // Simulation d'une réponse API positive pour l'envoi de l'OTP
//     console.log("Emails validés:", data);
//     setStep(2); // Passe à l'étape 2 pour entrer l'OTP
//   };

//   const handleOTPSubmit = (data: AuthFormValues) => {
//     console.log("OTP entré:", data.otp);
//     if (data.otp === "123456") {
//       // Simuler un OTP correct
//       onSuccess();
//     } else {
//       setError("OTP incorrect");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(step === 1 ? handleEmailSubmit : handleOTPSubmit)}
//       className="space-y-6 p-4 bg-white shadow-md rounded-lg"
//     >
//       {step === 1 && (
//         <>
//           {/* Email input */}
//           <div className="flex flex-col space-y-1">
//             <Label className="text-gray-700 font-medium">Email</Label>
//             <Input
//               {...register("email", { required: "Champ requis" })}
//               placeholder="Votre email"
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Email confirmation */}
//           <div className="flex flex-col space-y-1">
//             <Label className="text-gray-700 font-medium">
//               Confirmez l&apos;Email
//             </Label>
//             <Input
//               {...register("confirmEmail", { required: "Champ requis" })}
//               placeholder="Confirmez votre email"
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {errors.confirmEmail && (
//               <p className="text-red-600 text-sm mt-1">
//                 {errors.confirmEmail.message}
//               </p>
//             )}
//           </div>

//           {/* Submit email */}
//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Envoyer OTP
//             </Button>
//           </div>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           {/* OTP input */}
//           <div className="flex flex-col space-y-1">
//             <Label className="text-gray-700 font-medium">
//               Entrez votre code OTP
//             </Label>
//             <InputOTP
//               maxLength={6}
//               onChange={(newValue: string) => setValue("otp", newValue)}
//               className="flex justify-between items-center space-x-3 mt-2"
//             >
//               <InputOTPGroup className="flex space-x-2">
//                 <InputOTPSlot
//                   index={0}
//                   className="w-12 h-12 border border-gray-300 rounded-md text-center"
//                 />
//                 <InputOTPSlot
//                   index={1}
//                   className="w-12 h-12 border border-gray-300 rounded-md text-center"
//                 />
//                 <InputOTPSlot
//                   index={2}
//                   className="w-12 h-12 border border-gray-300 rounded-md text-center"
//                 />
//               </InputOTPGroup>
//               <InputOTPSeparator className="mx-2" />
//               <InputOTPGroup className="flex space-x-2">
//                 <InputOTPSlot
//                   index={3}
//                   className="w-12 h-12 border border-gray-300 rounded-md text-center"
//                 />
//                 <InputOTPSlot
//                   index={4}
//                   className="w-12 h-12 border border-gray-300 rounded-md text-center"
//                 />
//                 <InputOTPSlot
//                   index={5}
//                   className="w-12 h-12 border border-gray-300 rounded-md text-center"
//                 />
//               </InputOTPGroup>
//             </InputOTP>
//             {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
//             {errors.otp && (
//               <p className="text-red-600 text-sm mt-1">{errors.otp.message}</p>
//             )}
//           </div>

//           {/* Back and submit buttons */}
//           <div className="flex justify-between">
//             <Button
//               type="button"
//               onClick={() => setStep(1)} // Retour à l'étape 1 pour modifier l'email
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//             >
//               Modifier Email
//             </Button>
//             <Button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//             >
//               Valider OTP
//             </Button>
//           </div>
//         </>
//       )}
//     </form>
//   );
// };

// export default AuthForm;
import { useState } from "react";
import EmailForm from "./EmailForm";
import OTPForm from "./OTPForm";

const Auth = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState(1); // Étape actuelle : 1 pour email, 2 pour OTP
  const [emailData, setEmailData] = useState(null);

  const handleEmailSubmit = (data: any) => {
    setEmailData(data); // On peut enregistrer l'email si nécessaire
    setStep(2); // Passe à l'étape OTP
  };

  const handleOTPSubmit = (data: any) => {
    if (data.otp === "123456") {
      onSuccess(); // OTP correct, succès
    } else {
      alert("Code incorrect");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {step === 1 && <EmailForm onSubmit={handleEmailSubmit} />}
      {step === 2 && <OTPForm onSubmit={handleOTPSubmit} />}
    </div>
  );
};

export default Auth;
