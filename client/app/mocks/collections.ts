// exampleMenuData.ts

import { CollectionTypes } from "../types/CollectionTypes";

export const collections: CollectionTypes[] = [
  {
    id: 1,
    label: "Pour un jour d'exception", // correspond au label de la collection
    is_archived: false,
    created_at: "2024-09-12T15:20:01.000Z",
    updated_at: "2024-09-12T15:20:01.000Z",
    categories: [
      {
        id: 1,
        label: "Bracelet", // correspond au label de la catégorie
        is_archived: false,
        created_at: "2024-09-12T15:20:42.000Z",
        updated_at: "2024-09-12T15:20:42.000Z",
      },
      {
        id: 2,
        label: "Colliers de dos",
        is_archived: false,
        created_at: "2024-09-12T18:32:55.000Z",
        updated_at: "2024-09-12T18:32:55.000Z",
      },
      {
        id: 3,
        label: "Colliers",
        is_archived: false,
        created_at: "2024-09-12T18:34:16.000Z",
        updated_at: "2024-09-12T18:34:16.000Z",
      },
      {
        id: 4,
        label: "Boucles d'oreilles",
        is_archived: false,
        created_at: "2024-09-12T18:34:16.000Z",
        updated_at: "2024-09-12T18:34:16.000Z",
      },
    ],
  },
  {
    id: 2,
    label: "Pour le quotidien",
    is_archived: false,
    created_at: "2024-09-12T15:20:01.000Z",
    updated_at: "2024-09-12T15:20:01.000Z",
    categories: [
      {
        id: 5,
        label: "Broches",
        is_archived: false,
        created_at: "2024-09-12T15:20:42.000Z",
        updated_at: "2024-09-12T15:20:42.000Z",
      },
      {
        id: 6,
        label: "Voiles",
        is_archived: false,
        created_at: "2024-09-12T18:32:55.000Z",
        updated_at: "2024-09-12T18:32:55.000Z",
      },
    ],
  },
  {
    id: 3,
    label: "Demoiselles d'honneur",
    is_archived: false,
    created_at: "2024-09-12T15:20:01.000Z",
    updated_at: "2024-09-12T15:20:01.000Z",
    categories: [
      {
        id: 7,
        label: "Chaussures",
        is_archived: false,
        created_at: "2024-09-12T15:20:42.000Z",
        updated_at: "2024-09-12T15:20:42.000Z",
      },
      {
        id: 8,
        label: "Vestes",
        is_archived: false,
        created_at: "2024-09-12T18:32:55.000Z",
        updated_at: "2024-09-12T18:32:55.000Z",
      },
    ],
  },
  {
    id: 4,
    label: "Accessoires",
    is_archived: false,
    created_at: "2024-09-12T15:20:01.000Z",
    updated_at: "2024-09-12T15:20:01.000Z",
    categories: [
      {
        id: 9,
        label: "Parapluie",
        is_archived: false,
        created_at: "2024-09-12T15:20:42.000Z",
        updated_at: "2024-09-12T15:20:42.000Z",
      },
      {
        id: 10,
        label: "Rubans",
        is_archived: false,
        created_at: "2024-09-12T18:32:55.000Z",
        updated_at: "2024-09-12T18:32:55.000Z",
      },
      {
        id: 11,
        label: "Peignes",
        is_archived: false,
        created_at: "2024-09-12T18:32:55.000Z",
        updated_at: "2024-09-12T18:32:55.000Z",
      },
    ],
  },
];
