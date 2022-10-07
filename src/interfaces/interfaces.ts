export interface Product {
  id?: number;
  name: string;
  amount: string;
}

export interface Users {
  id?: number;
  username: string,
  classe: string,
  level: number,
  password: string
}

export interface Orders {
  id: number,
  userId: number,
  productsIds: Array<number>, 
}

export interface Login {
  username: string,
  password: string
}