export const deliveries = [
  {
    id: 1,
    name: "colissimo",
    icon_url: "https/server-storage/url",
    is_active: true,
    is_default: true,
    rates: [
      {
        min_weight: 0,
        max_weight: 250,
        price: 3.99,
      },
      {
        min_weight: 251,
        max_weight: 500,
        price: 5.99,
      },
      {
        min_weight: 501,
        max_weight: 750,
        price: 7.99,
      },
      {
        min_weight: 751,
        max_weight: 1000,
        price: 9.99,
      },
      {
        min_weight: 1001,
        max_weight: 1500,
        price: 11.99,
      },
      {
        min_weight: 1501,
        max_weight: 2000,
        price: 13.99,
      },
      {
        min_weight: 2001,
        max_weight: 10000,
        price: 15.99,
      },
    ],
  },
  {
    id: 2,
    name: "chronopost",
    icon_url: "https/server-storage/url",
    is_active: true,
    is_default: false,
    rates: [
      {
        min_weight: 0,
        max_weight: 250,
        price: 5,
      },
      {
        min_weight: 251,
        max_weight: 500,
        price: 10,
      },
      {
        min_weight: 501,
        max_weight: 750,
        price: 15,
      },
      {
        min_weight: 751,
        max_weight: 1000,
        price: 20,
      },
      {
        min_weight: 1001,
        max_weight: 1500,
        price: 25,
      },
      {
        min_weight: 1501,
        max_weight: 2000,
        price: 30,
      },
      {
        min_weight: 2001,
        max_weight: 10000,
        price: 35,
      },
    ],
  },
  {
    id: 3,
    name: "DHL",
    icon_url: "https/server-storage/url",
    is_active: true,
    is_default: false,
    rates: [
      {
        min_weight: 0,
        max_weight: 250,
        price: 4.99,
      },
      {
        min_weight: 251,
        max_weight: 500,
        price: 8.99,
      },
      {
        min_weight: 501,
        max_weight: 750,
        price: 12.99,
      },
      {
        min_weight: 751,
        max_weight: 1000,
        price: 15.99,
      },
      {
        min_weight: 1001,
        max_weight: 1500,
        price: 19.99,
      },
      {
        min_weight: 1501,
        max_weight: 2000,
        price: 22.99,
      },
      {
        min_weight: 2001,
        max_weight: 20000,
        price: 32.99,
      },
    ],
  },
];
