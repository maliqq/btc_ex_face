export type ID = string | number;

export interface Transaction {
  id?: ID,
  amount: numeric,
  from_amount_currency: 'USDT',
  to_amount_currency: 'BTC',
  terms_accepted: boolean
};
