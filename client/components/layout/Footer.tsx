import React from "react";

const letterSpacing1 = "0.2";
const letterSpacing2 = "0.3";
const Footer = () => {
  return (
    <footer className="bg-purple-300 dark:bg-purple-900 text-white dark:text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne 1 : Menu principal */}
        <div>
          <h2
            className="text-lg font-semibold text-purple-200 dark:text-purple-400"
            style={{ letterSpacing: letterSpacing2 }}
          >
            MENU PRINCIPAL
          </h2>
          <ul className="mt-4">
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/produits"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Produits
              </a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/avantages"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Avantages
              </a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/creatrice"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Créatrice
              </a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/contact"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Colonne 2 : Réseaux sociaux */}
        <div>
          <h2
            className="text-lg font-semibold text-purple-200 dark:text-purple-400"
            style={{ letterSpacing: letterSpacing2 }}
          >
            RESEAUX SOCIAUX
          </h2>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://www.facebook.com/people/Cindy-Pantoustier-Naturopathe/100085082745386/?ref=pages_you_manage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="h-10 w-10 fill-purple-300 dark:fill-purple-500"
              />
            </a>
            <a
              href="https://www.instagram.com/cindy_naturo/?hl=fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/instagram.png"
                alt="Instagram"
                className="h-10 w-10 fill-purple-300 dark:fill-purple-500"
              />
            </a>
          </div>
        </div>

        {/* Colonne 3 : Informations générales */}
        <div>
          <h2
            className="text-lg font-semibold text-purple-200 dark:text-purple-400"
            style={{ letterSpacing: letterSpacing2 }}
          >
            INFORMATIONS
          </h2>
          <ul className="mt-4">
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/livraisons-et-retours"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Livraisons et retours
              </a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/mentions-legales"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Mentions légales
              </a>
            </li>
            <li style={{ letterSpacing: letterSpacing1 }}>
              <a
                href="/condtions-generales-de-vente"
                className="hover:text-purple-300 dark:hover:text-purple-500 text-purple-100 dark:text-gray-400"
              >
                Conditions générales de vente
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-purple-100 dark:text-gray-400">
        <p>&copy; 2025 Atelier Noralya. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
