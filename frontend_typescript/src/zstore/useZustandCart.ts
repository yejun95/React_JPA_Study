import {create} from "zustand/react";
import {getCartItems, postChangeCart} from "../api/cartApi.tsx";

export interface CartStore {
  items: CartItemResponse[]
  status: string,
  getItems: () => void,
  requestChangeCart: (cartItem: CartItemRequest) => void
}

export const useZustandCart = create<CartStore>( (set) => {

  return {
    items: [],
    status: '',
    getItems: async () => {
      set({ status: 'pending' })

      const cartData = await getCartItems()

      set({ items: cartData, status: 'fulfilled' })
    },
    requestChangeCart: async (cartItem: CartItemRequest) => {
      set({ status: 'pending' })

      const changeData = await postChangeCart(cartItem)
      set({ items: changeData, status: 'fulfilled' })
    }
  }
})