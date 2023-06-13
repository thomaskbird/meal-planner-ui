import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  createUsersSlice,
} from './slices';
import { StoreState } from './types';

export const useMealStore = create(
  persist(immer<StoreState>(
    (...a) => ({
      ...createUsersSlice(...a),
    }),
  ), {
    name: 'meal-time',
    // You should be same keys or use merge and migrate functions see zustand docs for details
    partialize: (state) => ({
      usersState: state.usersState,
    }),
  }),
);
