import { CategoryTypes } from "./CategoryTypes";

  export interface CollectionTypes {
    id: number;
    label: string;
    is_archived: boolean;
    created_at: string;
    updated_at: string;
    categories: CategoryTypes[];
  }