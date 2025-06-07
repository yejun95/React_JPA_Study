import {useEffect} from "react"
import {useZustandCart} from "../zstore/useZustandCart.ts";
import {useZustandMember} from "../zstore/useZustandMember.ts";

export default function useCustomCart() {

  const { member: loginState, status: loginStatus } = useZustandMember()

  const { items, getItems, requestChangeCart, status } = useZustandCart()

  const cartItems = {items: items, status: status}

  useEffect(() => {
    if(loginStatus) {
      getItems()
    }
  },[loginStatus])

  const changeCart = (cino: number | null  , pno: number,  amount:number) => {
      const email = loginState.email
      let qty = 1

      if(cino){
        const targetArr = cartItems.items.filter(item => item.cino === cino)
        
        if(targetArr.length > 0) {
          qty = targetArr[0].qty + amount  
        }
      }

      const requestItem:CartItemRequest = cino ? {email, cino, pno, qty } : {email, pno, qty}
      console.log(requestItem)
      requestChangeCart(requestItem)
  }
  return {loginState, loginStatus, cartItems, changeCart}
}


