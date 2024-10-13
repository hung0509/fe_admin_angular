export interface OrderRequest {
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  shipping: number;
  paymentMethod: number;
  amount: number;
  note: string;
}

export interface Orders {
  id: number;
  fullname: string;
  address: string;
  amount: number;
  status: number;
  note: string;
}

export class OrderList {
  public static items: Orders[] = [
    {
      id: 1,
      fullname: 'Lê Xân a',
      address: 'abc',
      amount: 100000,
      status: 1,
      note: 'string',
    },
    {
        id: 2,
        fullname: 'Lê Xân a',
        address: 'abc',
        amount: 100000,
        status: 0,
        note: 'string',
      },
      {
        id: 3,
        fullname: 'Lê Xân a',
        address: 'abc',
        amount: 100000,
        status: -1,
        note: 'string',
      },
  ];
}
