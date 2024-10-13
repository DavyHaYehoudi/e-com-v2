import { MasterProductType, Product, ProductCart } from "../types/ProductTypes";

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    SKU: "08f0jKKH234",
    description: "joli produit 1",
    main_image: "logo.png",
    discount_percentage: 12,
    discount_end_date: "2024-10-10",
    weight: 500,
    continue_selling: false,
    quantity_in_stock: 0,
    price: 50,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 2,
    variant: null,
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 2,
    name: "bracelet",
    SKU: "OKMNJ89998",
    description: "joli produit 2",
    main_image: "partner2.jpeg",
    discount_percentage: 10,
    discount_end_date: "2025-10-10",
    weight: 1000,
    continue_selling: true,
    quantity_in_stock: 15,
    price: 23,
    new_until: "2023-10-10",
    is_published: true,
    cash_back: 8,
    variant: null,
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 3,
    name: "collier",
    SKU: "BV!QAS#WJS",
    description: "joli produit 3",
    main_image: "partner3.jpeg",
    discount_percentage: null,
    discount_end_date: null,
    weight: null,
    continue_selling: false,
    quantity_in_stock: 10,
    price: 15,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 20,
    variant: "S/Blue",
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 4,
    name: "collier de dos",
    SKU: "MlOxJD*S&RNS",
    description: "joli produit 4",
    main_image: "partner1.jpeg",
    discount_percentage: null,
    discount_end_date: null,
    weight: 75,
    continue_selling: true,
    quantity_in_stock: 10,
    price: 200,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 11,
    variant: "Orange",
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 5,
    name: "broche",
    SKU: "MlOxJD*S&RNS",
    description: "joli produit 4",
    main_image: "partner1.jpeg",
    discount_percentage: null,
    discount_end_date: null,
    weight: 75,
    continue_selling: true,
    quantity_in_stock: 10,
    price: 200,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 11,
    variant: "Orange",
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 6,
    name: "Parapluie",
    SKU: "MlOxJD*S&RNS",
    description: "joli produit 4",
    main_image: "partner1.jpeg",
    discount_percentage: null,
    discount_end_date: null,
    weight: 75,
    continue_selling: true,
    quantity_in_stock: 10,
    price: 200,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 11,
    variant: "Orange",
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 7,
    name: "chaussures",
    SKU: "MlOxJD*S&RNS",
    description: "joli produit 4",
    main_image: "partner1.jpeg",
    discount_percentage: 5,
    discount_end_date: "2024-10-15",
    weight: 75,
    continue_selling: true,
    quantity_in_stock: 10,
    price: 200,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 11,
    variant: "Orange",
    is_star: true,
    isArchived: false,
    isActive: true,
  },
  {
    id: 8,
    name: "boucles d'oreilles",
    SKU: "MlOxJD*S&RNS",
    description: "joli produit 4",
    main_image: "partner1.jpeg",
    discount_percentage: null,
    discount_end_date: null,
    weight: 75,
    continue_selling: true,
    quantity_in_stock: 10,
    price: 200,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 11,
    variant: "Orange",
    is_star: true,
    isArchived: false,
    isActive: true,
  },
];
export const productsInCart: ProductCart = {
  items: [
    {
      id: 1,
      name: "Product 1",
      main_image: "logo.png",
      discount_percentage: 12,
      discount_end_date: "2024-10-10",
      weight: 500,
      price: 50,
      new_until: "2025-10-10",
      cash_back: null,
      variant: null,
      quantityInCart: 1,
      quantity_in_stock: 10,
    },
    {
      id: 2,
      name: "Product 2",
      main_image: "partner2.jpeg",
      discount_percentage: 10,discount_end_date: "2025-10-10",
      weight: 1000,
      price: 23,
      new_until: "2023-10-10",
      cash_back: 3,
      variant: null,
      quantityInCart: 2,
      quantity_in_stock: 3,
    },
    {
      id: 3,
      name: "Product 3",
      main_image: "partner3.jpeg",
      discount_percentage: null,
      discount_end_date: null,
      weight: null,
      price: 15,
      new_until: "2025-10-10",
      cash_back: 2.5,
      variant: "S/Blue",
      quantityInCart: 1,
      quantity_in_stock: 4,
    },
    {
      id: 4,
      name: "Product 4Product 4Product ",
      main_image: "partner1.jpeg",
      discount_percentage: null,
      discount_end_date: null,
      weight: 75,
      price: 200,
      new_until: "2025-10-10",
      cash_back: 3.5,
      variant: "Orange",
      quantityInCart: 1,
      quantity_in_stock: 6,
    },
  ],
  gift_cards: [
    {
      amount: 10,
      quantity: 2,
    },
    // {
    //   amount: 5,
    //   quantity: 1,
    // },
    // {
    //   amount: 20,
    //   quantity: 3,
    // },
  ],
};

// export const productsInCart = {
//   items: [],
//   gift_cards: [],
// };

// export const products:Product[] = []

export const mockMasterProducts: MasterProductType[] = [
  {
    id:1,
    name: "Bracelet",
    SKU: "029348752LIK98",
    description: "Bracelet fait main.",
    weight: 250,
    discount_percentage: 10,
    discount_end_date: "2024-10-10",
    continue_selling: true,
    quantity_in_stock: 4,
    price: 45,
    new_until: "2025-10-10",
    is_published: true,
    cash_back: 1.5,
    is_star: false,
    is_archived: false,
    images: [
      {
        url: "logo.png",
        is_main: true,
      },
      {
        url: "partner2.jpeg",
        is_main: false,
      },
      {
        url: "partner3.jpeg",
        is_main: false,
      },
    ],
    categories: [7778325, 8882343],
    tags: [334, 1234545],
    variants: ["S/Blue", "XL/Black", "M/Orange"],
    createdAt: "2024-03-21T17:50:38.100Z",
    updatedAt: "2024-03-21T17:50:38.100Z",
  },
  {
    id:2,
    name: "Montre de luxe",
    SKU: "9876543210ABCD",
    description: "Montre de luxe en acier inoxydable.",
    weight: 150,
    discount_percentage: 5,
    discount_end_date: "2025-10-10",
    continue_selling: true,
    quantity_in_stock: 10,
    price: 2500,
    new_until: "2024-12-31",
    is_published: true,
    cash_back: 5.0,
    is_star: true,
    is_archived: false,
    images: [
      {
        url: "partner4.jpeg",
        is_main: true,
      },
      {
        url: "partner3.jpeg",
        is_main: false,
      },
    ],
    categories: [5554321],
    tags: [101, 202],
    variants: ["M/Silver", "L/Gold"],
    createdAt: "2024-02-15T10:20:30.200Z",
    updatedAt: "2024-02-16T12:25:45.300Z",
  },
  {
    id:3,
    name: "Chaussures de sport",
    SKU: "A1B2C3D4E5F6",
    description: `
  Ce bracelet unique est fabriqué à la main avec des matériaux de haute qualité. 
  Il combine à la fois élégance et durabilité, parfait pour toutes les occasions, 
  que ce soit pour un usage quotidien ou pour des événements spéciaux. 
  Son design minimaliste s'harmonise avec n'importe quel style vestimentaire. 
  Disponible en plusieurs tailles, il est conçu pour s'adapter à tous les poignets.
  En plus d'être un accessoire de mode intemporel, il est également hypoallergénique et confortable à porter tout au long de la journée.
`,
    weight: 500,
    discount_percentage: 15,
    discount_end_date: "2024-12-12",
    continue_selling: false,
    quantity_in_stock: 2,
    price: 120,
    new_until: "2024-11-15",
    is_published: false,
    cash_back: 2.0,
    is_star: true,
    is_archived: false,
    images: [
      {
        url: "partner1.jpeg",
        is_main: true,
      },
      {
        url: "partner2.jpeg",
        is_main: false,
      },
      {
        url: "partner3.jpeg",
        is_main: false,
      },
      {
        url: "partner4.jpeg",
        is_main: false,
      },
      {
        url: "logo.png",
        is_main: false,
      },
      {
        url: "partner1.jpeg",
        is_main: true,
      },
      {
        url: "partner2.jpeg",
        is_main: false,
      },
      {
        url: "partner3.jpeg",
        is_main: false,
      },
      {
        url: "partner4.jpeg",
        is_main: false,
      },
      {
        url: "logo.png",
        is_main: false,
      },
    ],
    categories: [1234567, 7654321],
    tags: [303, 404],
    variants: ["42/Black", "44/Red"],
    createdAt: "2024-04-10T15:30:45.500Z",
    updatedAt: "2024-05-01T18:40:25.600Z",
  },
];
