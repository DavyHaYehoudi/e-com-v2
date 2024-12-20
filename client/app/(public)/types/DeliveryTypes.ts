export interface Rates {
  min_weight: number;
  max_weight: number;
  price: number;
}

export interface DeliveryType {
  id: number;
  name: string;
  icon_url: string;
  is_active: boolean;
  is_default: boolean;
  free_from: number;
  rates: Rates[];
}
