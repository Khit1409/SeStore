export type Attributes = {
  name: string;
  value: (string | number)[];
};
export type ProductType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  brands: string;
  attributes: Attributes[];
  state_product: string;
  type_product: string;
};

export type ProductState = {
  products: ProductType[] | null;
  product_detail: ProductType | null;
  error: string | null;
};

export const productInitState: ProductState = {
  product_detail: null,
  products: null,
  error: null,
};
