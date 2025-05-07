import React from 'react';

function CartItemComponent({cartItem}) {

    const {cino, pno, pname, price, qty, imageFile} = cartItem

    return (
        <li key={cino} className='border-2'>
            <div className='w-full border-2'>
                <div className='m-1 p-1'>
                    <img src={`http://localhost:8080/api/products/view/s_${imageFile}`} />
                </div>
            </div>

            <div className='justify-center p-2 text-xl'>
                <div className='justify-end w-full'></div>
                <div>Cart Item No: {cino}</div>
                <div>Pno: {pno}</div>
                <div>Name: {pname}</div>
                <div>Price: {price}</div>
                <div className='flex'>
                    <div className='w-2/3'>
                        Qty: {qty}
                    </div>
                    <div className='font-extrabold border-t-2 text-right m-2 pr-4'>
                        {qty * price} 원
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CartItemComponent;