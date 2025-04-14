import React from 'react';
import {getKakaoLoginLink} from "../../api/kakaoApi";
import {Link} from "react-router-dom";

const link = getKakaoLoginLink();
function KakaoLoginComponent(props) {

    return (
        <div className={'flex flex-col'}>
            <div className={'text-center text-blue-500'}>로그인시에 자동 가입처리 됩니다.</div>
            <div className={'flex justify-center w-full'}>
                <Link to={link}>KAKAO LOGIN</Link>
            </div>
        </div>
    );
}

export default KakaoLoginComponent;
