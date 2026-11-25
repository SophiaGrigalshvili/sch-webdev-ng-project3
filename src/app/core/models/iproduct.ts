export interface IProduct {
  id: number;
  name: 'string';
  description: 'string';
  vegetarian: boolean;
  spiciness: number;
  rate: number;
  price: number;
  image: 'string';
  canDelete: boolean;

  categoryId?: number;
  ingredients?: string[];
  method?: string;
  items?: [];
}

export interface IProductData {
  products: IProduct[];
  hasMore: boolean;
}

export interface IMetaData {
  data: IProductData;
  meta: {};
}

export interface IMetaDataId {
  data: IProduct;
  meta: {};
}
