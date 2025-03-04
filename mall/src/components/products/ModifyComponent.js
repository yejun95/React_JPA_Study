import React, {useEffect, useRef, useState} from 'react';
import {getOne} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import {API_SERVER_HOST} from "../../api/todoApi";

const initState = {
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    delFlag: false,
    uploadFileNames: []
}

const host = API_SERVER_HOST;

function ModifyComponent({pno}) {
    const [product, setProduct] = useState(initState);
    const [fetching, setFetching] = useState(false);

    const uploadRef = useRef();

    useEffect(() => {
        setFetching(true);

        getOne(pno).then(data => {
            setProduct(data);
            setFetching(false);
        })
    }, [pno]);

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;

        setProduct({...product});
    }

    const deleteOldImages = (imageName) => {
        // 일단 화면에서만 삭제하기 위한 로직
        const resultFileNames = product.uploadFileNames.filter(fileName => fileName !== imageName);

        product.uploadFileNames = resultFileNames;

        setProduct({...product});
    }

    return (
        <div className={'border-2 border-sky-200 mt-10 m-2 p-4'}>
            {fetching ? <FetchingModal/> : <></>}

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'}
                           name={'pname'}
                           type={'text'}
                           value={product.pname}
                           onChange={handleChangeProduct}
                    />
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>Desc</div>
                    <textarea
                        className={'w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y'}
                        name={'pdesc'}
                        rows={'4'}
                        onChange={handleChangeProduct}
                        value={product.pdesc}
                    >
                        {product.pdesc}
                    </textarea>
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>Price</div>
                    <input className={'w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'}
                           name={'price'}
                           type={'number'}
                           value={product.price}
                           onChange={handleChangeProduct}
                    />
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>DELETE</div>
                    <select
                        className={'w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'}
                        name={'delFlag'}
                        value={product.delFlag}
                        onChange={handleChangeProduct}>
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>Files</div>
                    <input ref={uploadRef}
                           className={'w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md'}
                           type={'file'}
                           multiple={true}
                    />
                </div>
            </div>

            <div className={'flex justify-center'}>
                <div className={'relative mb-4 flex w-full flex-wrap items-stretch'}>
                    <div className={'w-1/5 p-6 text-right font-bold'}>Images</div>
                    <div className={'w-4/5 justify-center flex flex-wrap items-stretch'}>
                        {product.uploadFileNames.map((imgFile, i) =>
                            <div className={'flex justify-center flex-col w-1/3 m-1 align-baseline'}
                                 key={i}>
                                 <button className={'bg-blue-500 text-3xl text-white'}
                                         onClick={() => deleteOldImages(imgFile)}
                                 >
                                     DELETE
                                 </button>
                                 <img alt={"img"}
                                      src={`${host}/api/products/view/s_${imgFile}`}/>
                            </div>

                        )}
                    </div>
                </div>
            </div>

        </div> //end container
    );
}

export default ModifyComponent;