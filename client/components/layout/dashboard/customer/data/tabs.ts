import {
  BadgeEuro,
  Gift,
  MessageCircleMore,
  Rocket,
  ShoppingCart,
  Truck,
  UserRound,
  MapPinHouse
} from "lucide-react";

export const data = {
  account: [
    {
      title: "Profil",
      url: "/",
      icon: UserRound,
      isActive: true,
      items: [
        {
          title: "Identité",
          url: "/customer/tableau-de-bord/profil/identite",
        },
        {
          title: "Avatar",
          url: "/customer/tableau-de-bord/profil/avatar",
        },
      ],
    },
    {
      title: "Adresses",
      url: "#",
      icon: MapPinHouse,
      items: [
        {
          title: "Livraison",
          url: "/customer/tableau-de-bord/adresses/livraison",
        },
        {
          title: "Facturation",
          url: "/customer/tableau-de-bord/adresses/facturation",
        },
      ],
    },
  ],
  activities: [
    {
      title: "Commandes",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "En cours",
          url: "#",
        },
        {
          title: "Expédiées",
          url: "#",
        },
        {
          title: "Retour",
          url: "#",
        },
      ],
    },
    {
      title: "Messagerie",
      url: "#",
      icon: MessageCircleMore,
      items: [
        {
          title: "Contacter la responsable",
          url: "#",
        },
      ],
    },
  ],
  advantages: [
    {
      title: "Opportunités",
      url: "#",
      icon: Rocket,
      isActive: true,
      items: [
        {
          title: "Récompenses",
          url: "#",
        },
        {
          title: "Offres",
          url: "#",
        },
      ],
    },
    {
      title: "Cartes cadeaux",
      url: "#",
      icon: Gift,
      isActive: true,
      items: [
        {
          title: "Historique",
          url: "#",
        },
      ],
    },
    {
      title: "Cashback",
      url: "#",
      icon: BadgeEuro,
      items: [
        {
          title: "Historique",
          url: "#",
        },
      ],
    },
  ],
};
