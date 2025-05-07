import useCustomLogin from "./useCustomLogin";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCartItemsAsync} from "../slices/cartSlice";

function useCustomCart() {
    const {loginState, isLogin} = useCustomLogin()

    const cartItems = useSelector(state => state.cartSlice)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isLogin) {
            dispatch(getCartItemsAsync())
        }
    }, [isLogin]);

    return {loginState, isLogin, cartItems}
}

export default useCustomCart