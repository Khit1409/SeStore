export interface IProductItem {
  productId: string;
  quantity: number;
  attributes: { name: string; value: string[] }[];
  snapshot: {
    name: string;
    price: number;
    image: string;
    brands: string;
    stateProduct: string;
    typeProduct: string;
  };
}

export interface Cart {
  _id: string;
  users: {
    _id: string;
    fullname: string;
    phone: string;
    email: string;
  };
  productItems: IProductItem[];
  product_detail: IProductItem;
  methodPay: string;
  stateOrder: string;
  shippingStatus: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ICartState {
  carts: Cart[] | null;
  cart_detail: Cart | null;
  error: string | null;
}

export const cartInitState: ICartState = {
  carts: null,
  cart_detail: null,
  error: null,
};
