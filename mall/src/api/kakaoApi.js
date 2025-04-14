import axios from "axios";

const rest_api_key = '13df2264aba336ef247b64427760f14b';
const redirect_uri = 'http://localhost:3000/member/kakao';
const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'; // 인가 코드 발급 url
const access_token_url = 'https://kauth.kakao.com/oauth/token'; // 토큰 발급 url

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL;
}

export const getAccessToken = async (authCode) => {

    const header = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}

    const params = {
        grant_type: 'authorization_code',
        client_id: '13df2264aba336ef247b64427760f14b',
        redirect_uri: 'http://localhost:3000/member/kakao',
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header);

    const accessToken = res.data.access_token;

    return accessToken;
}
