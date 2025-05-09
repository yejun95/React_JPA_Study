import React from 'react';
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/cartItemComponent";

function CartComponent(props) {

    const {loginState, isLogin, cartItems, changeCart} = useCustomCart()

    return (
        <div className='w-full'>
            {isLogin &&
                <>
                    {cartItems.status === 'pending' && <div>...Loading</div>}
                    {cartItems.status === 'fulfilled' &&
                        <>
                            <div>{loginState.email}님 Cart</div>
                            <div className='bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1'>
                                {cartItems.items.length}
                            </div>
                            <ul>
                                {cartItems.items.map(item => <CartItemComponent cartItem={item} changeCart={changeCart} key={item.cino}/>)}
                            </ul>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default CartComponent;