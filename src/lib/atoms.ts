import { atom, atomFamily, selectorFamily, selector } from 'recoil';

import { type Transaction } from '@/lib/types';

export const new_transaction = atom<Transaction>({
  key: 'new_transaction',
  default: {} as Transaction,
});
