import { Copy } from "lucide-react";
import { useState } from "react";

interface ClipboardButtonProps {
  text: string;
  className?: string;
  iconSize?: number; // Taille de l'icône (facultatif)
}

const ClipboardButton: React.FC<ClipboardButtonProps> = ({
  text,
  className,
  iconSize = 16, // Valeur par défaut pour l'icône
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialise l'état après 2 secondes
    });
  };

  return (
    <div className={`relative inline-flex items-center gap-1 ${className}`}>
      <button
        onClick={handleCopy}
        className="flex items-center text-gray-500 hover:text-gray-800 focus:outline-none"
        title="Copier"
      >
        <Copy
          className="w-4 h-4"
          style={{ width: iconSize, height: iconSize }}
        />
      </button>
      {copied && (
        <span className="absolute -top-5 left-0 text-xs text-green-500">
          Copié !
        </span>
      )}
    </div>
  );
};

export default ClipboardButton;
