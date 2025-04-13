type Attributes = {
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
  stateProduct: "new" | "used";
  typeProduct:
    | "fashion"
    | "vehicles"
    | "household_appliances"
    | "devices"
    | "other";
};

export type ProductState = {
  product: ProductType[] | null;
  error: string | null;
};

export const productInitState: ProductState = {
  product: null,
  error: null,
};
