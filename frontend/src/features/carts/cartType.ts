export interface ProductItem {
  _id: string;
  productId: 
    {
      _id: string;
      image: string;
      name: string;
      price: number;
      brands: string;
      stateProduct: string;
      typeProduct: string;
      sellerId?: string;
    }
  ;
  quantity: number;
  attributes: {
    name: string;
    value: string[];
  }[];
}

export interface Cart {
  _id: string;
  users: {
    _id: string;
    fullname: string;
    phone: string;
    email: string;
  };
  productItems: ProductItem[];
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CartState {
  cart: Cart[] | null;
  error: string | null;
}

export const cartInitState: CartState = {
  cart: null,
  error: null,
};
