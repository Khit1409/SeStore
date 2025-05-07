import { IProductItem } from "../carts/cart.type";

export interface Order {
  _id: string;
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
export interface Order {
  _id: string;
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

interface IOrderState {
  orders: Order[] | null;
  order_detail: Order | null;
  error: string | null;
  checkoutUrl: string | null;
  loading: boolean;
}

export const orderInitState: IOrderState = {
  orders: null,
  order_detail: null,
  loading: false,
  checkoutUrl: null,
  error: null,
};
