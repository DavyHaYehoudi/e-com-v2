import { Mail, Home,MapPin ,CreditCard} from "lucide-react";
const ProgressBarCheckout = ({ step }: { step: number }) => {
    return (
      <div className="flex items-center mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-green-500' : 'text-gray-400'}`}>
          <Mail className="w-6 h-6 mr-2" />
          <span>Authentification</span>
        </div>
        <span className="mx-4">→</span>
        <div className={`flex items-center ${step >= 2 ? 'text-green-500' : 'text-gray-400'}`}>
          <Home className="w-6 h-6 mr-2" />
          <span>Adresse de livraison</span>
        </div>
        <span className="mx-4">→</span>
        <div className={`flex items-center ${step >= 3 ? 'text-green-500' : 'text-gray-400'}`}>
          <MapPin className="w-6 h-6 mr-2" />
          <span>Adresse de facturation</span>
        </div>
        <span className="mx-4">→</span>
        <div className={`flex items-center ${step >= 4 ? 'text-green-500' : 'text-gray-400'}`}>
          <CreditCard className="w-6 h-6 mr-2" />
          <span>Paiement</span>
        </div>
      </div>
    );
  };
  export default ProgressBarCheckout;