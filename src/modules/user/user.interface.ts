export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrders = {
  productName: string;
  price: number;
  quantity: number;
};


export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: TUserOrders[];
};
