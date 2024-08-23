export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  __v: number;
  readonly id?: number;
}

// web-socket
export interface IFeed {
  success: boolean;
  orders: IOrderFeedOptions[];
  total: number;
  totalToday: number;
}

export interface IOrderFeedOptions {
  _id: string;
  ingredients: string[];
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IWSActions {
  init: string;
  success: string;
  disconnect: string;
  error: string;
  closing: string;
  message: string;
}
