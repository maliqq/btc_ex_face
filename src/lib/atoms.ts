import axios from "axios";

import { API_BASE_URL } from '@/lib/constants';

import { atom, atomFamily, selectorFamily, selector } from 'recoil';

import { type Transaction } from '@/lib/types';

export const new_transaction = atom<Transaction>({
  key: 'new_transaction',
  default: {
    from_amount: 30,
    from_amount_currency: 'USDT',
    to_amount_currency: 'BTC',
    terms_accepted: false
  } as Transaction,
});

export const cache_key = atomFamily({
  key: 'cache_key',
  default: 0,
});

export const recalculated_transaction = selectorFamily<Transaction, ID>({
  key: 'recalculated_transaction',
  get: (amount: numeric) => async ({get}) => {
    get(cache_key(amount));
    const resp = await axios.get(`${API_BASE_URL}/api/v1/transactions/recalculate?amount=${amount}`);
    return resp.data as Transaction;
  }
});

export const get_transaction = selectorFamily<Transaction, ID>({
  key: 'get_transaction',
  get: (id) => async ({get}) => {
    const resp = await axios.get(`${API_BASE_URL}/api/v1/transactions/${id}`);
    return resp.data as Transaction;
  }
});
