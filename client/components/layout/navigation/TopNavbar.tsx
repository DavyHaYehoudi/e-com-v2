import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import NavIcons from "./NavIcons";

const TopNavbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-whitesmoke my-8">
      {/* Groupe 1 : Bouton Switch (Dark Mode) */}
      <div className="flex-1 ml-24">
        <ThemeToggle />
      </div>

      {/* Groupe 2 : Logo centré */}
      <div className="flex-none">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={75}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Groupe 3 : NavIcons (groupe d'éléments à droite) */}
      <div className="flex-1 flex justify-end ml-auto">
        <NavIcons />
      </div>
    </div>
  );
};
export default TopNavbar;
