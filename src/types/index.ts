export type ProductCategory = 
  | 'all'
  | 'bowls'
  | 'burgers'
  | 'salads'
  | 'pizzas'
  | 'desserts'
  | 'beverages';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'bowls' | 'burgers' | 'salads' | 'pizzas' | 'desserts' | 'beverages';
  image: string;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories: number;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  ingredients: string[];
  allergens?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  specialInstructions?: string;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  suite?: string;
  city: string;
  postalCode: string;
  deliveryInstructions?: string;
  deliveryMethod: 'standard' | 'express' | 'eco';
}

export interface PaymentDetails {
  method: 'card' | 'cash' | 'digital_wallet';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardHolder?: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  promoCode?: string;
  deliveryDetails: DeliveryDetails;
  paymentMethod: string;
  estimatedDeliveryTime: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: string;
  payload: Record<string, unknown>;
}
