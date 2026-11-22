export interface IProduct {
  id: number;
  name: 'string';
  description: 'string';
  vegeterian: boolean;
  spiciness: number;
  rate: number;
  price: number;
  image: 'string';
  canDelete: boolean;
}

export interface IProductData {
  products: IProduct[];
  hasMore: boolean;
}

export interface IMetaData {
  data: IProductData;
  meta: {};
}
