import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import useCustomLogin from "../hooks/useCustomLogin";

function AboutPage(props) {

    const {isLogin, moveToLoginReturn} = useCustomLogin();

    // 로그인이 되어 있지 않다면
    if (!isLogin) {
        return moveToLoginReturn();
    }

    return (
        <BasicLayout>
            <div className={'text-3xl'}>About Page</div>
        </BasicLayout>
    );
}

export default AboutPage;