import {create} from "zustand/react";

export interface CountStore{
  current: number
  amount: number
  inc: () => void
  dec: () => void
  changeAmount: (num: number) => void
}

const useZustandCount = create<CountStore>( (set, get) => {

  return {
    current: 13,
    amount: 1,
    //inc : () => { (state) => { count: state.current++}},
    inc: () => { set ({ current: get().current + get().amount }) },
    dec: () => { set ({ current: get().current + get().amount })},
    changeAmount: (num: number) => {
      set({ amount: num })
    }
  }
})

export default useZustandCount