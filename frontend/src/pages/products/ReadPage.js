import React from 'react';
import {useParams} from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

function ReadPage(props) {
    const {pno} = useParams();

    return (
        <div className={'p-4 w-full bg-white'}>
            <div className={'text-3xl font-extrabold'}>
                Products Read page
            </div>

            <ReadComponent pno={pno}/>
        </div>
    );
}

export default ReadPage;