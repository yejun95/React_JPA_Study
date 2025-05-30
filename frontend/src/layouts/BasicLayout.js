import React from 'react';
import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/menus/cartComponent";

function BasicLayout({children}) {
    return (
        <>
            <BasicMenu></BasicMenu>

            <div className={'bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0'}>

                <main className={'bg-sky-300 md:w-4/5 lg:w-3/4 px-5 py-5'}>
                    {children}
                </main>

                <aside className={'bg-green-300 md:w-1/5 lg:w-1/4 px-5 flex py-5'}>
                    <CartComponent />
                </aside>

            </div>
        </>
    );
}

export default BasicLayout;
