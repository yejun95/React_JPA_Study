import React from 'react';
import ModifyComponent from "../../components/member/ModifyComponent";
import BasicLayout from "../../layouts/BasicLayout";

function ModifyPage(props) {
    return (
        <BasicLayout>
            <div className={'text-3xl'}>Member Modify Page</div>

            <div className={'w-full flex flex-wrap h-full justify-center items-center border-2'}>
                <ModifyComponent/>
            </div>
        </BasicLayout>
    );
}

export default ModifyPage;
