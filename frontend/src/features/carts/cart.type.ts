export interface IProductItem {
  product_id: string;
  quantity: number;
  attributes: { name: string; value: string[] }[];
  snapshot: {
    name: string;
    price: number;
    image: string;
    brands: string;
    state_product: string;
    type_product: string;
  };
}

export interface Cart {
  _id: string;
  orderCode: number;
  users: {
    _id: string;
    name: string;
    phone: string;
    email: string;
  };
  product_items: IProductItem[];
  product_detail: IProductItem;
  method_pay: string;
  state_order: string;
  shipping_status: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ICartState {
  carts: Cart[] | null;
  cart_detail: Cart | null;
  error: string | null;
  loading: boolean;
}

export const cartInitState: ICartState = {
  carts: null,
  loading: false,
  cart_detail: null,
  error: null,
};
