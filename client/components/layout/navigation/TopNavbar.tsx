// import ThemeToggle from "@/components/shared/ThemeToggle";
// import Image from "next/image";
// import Link from "next/link";
// import NavIcons from "./NavIcons";

// const TopNavbar = () => {
//   return (
//     <div className="flex justify-between items-center p-4 my-8 dark bg-dark">
//       {/* Groupe 1 : Bouton Switch (Dark Mode) */}
//       <div className="flex-1 ml-1 lg:ml-24">
//         <ThemeToggle />
//       </div>

//       {/* Groupe 2 : Logo centré */}
//       <div className="flex-none">
//         <Link href="/">
//           <Image
//             src="/images/logo.png"
//             alt="Logo"
//             width={200}
//             height={75}
//             className="cursor-pointer"
//           />
//         </Link>
//       </div>

//       {/* Groupe 3 : NavIcons (groupe d'éléments à droite) */}
//       <div className="flex-1 flex justify-end items-center mr-1 lg:mr-24">
//         <NavIcons />
//       </div>
//     </div>
//   );
// };
// export default TopNavbar;
// TopNavBar.tsx
import ThemeToggle from "@/components/shared/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import NavIcons from "./NavIcons";

const TopNavbar = () => {
  return (
    <div className="p-4 my-8 bg-dark ">
      {/* Disposition pour les écrans larges (1440px et plus) */}
      <div className="hidden lg:flex justify-between items-center">
        <div className="flex-1  ml-1 lg:ml-24">
          <ThemeToggle />
        </div>
        <div className="flex-none">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={75}
              className="cursor-pointer rounded"
            />
          </Link>
        </div>
        <div className="flex-1 flex justify-end mr-1 lg:mr-24">
          <NavIcons />
        </div>
      </div>

      {/* Disposition pour les écrans moyens et petits (en dessous de 1440px) */}
      <div className="lg:hidden flex flex-col items-center space-y-4">
        {/* Block 2 : Logo centré en haut */}
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Block 1 et Block 3 : Opposés l’un à l’autre en bas */}
        <div className="flex w-full justify-between">
          <div className="m-2">
            <ThemeToggle />
          </div>
          <div className="m-2">
            <NavIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
