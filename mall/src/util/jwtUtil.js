import axios from "axios";
import {getCookie, setCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST;

    const header = {headers: {'Authorization': `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header);

    // 새로 받아온 refreshToken
    console.log('res', res);

    return res.data;
}

// before return request
const beforeReq = (config) => {

    console.log('before request..........');

    const memberInfo = getCookie('member');

    if (!memberInfo) {
        console.log('Member NOT FOUND');
        return Promise.reject({
            response: {
                data: {
                    error: "REQUIRE_LOGIN"
                }
            }
        })
    }

    const {accessToken} = memberInfo;

    console.log('--------------------------------------------' + accessToken);

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}

// fail request
const requestFail = (err) => {
    console.log('request error..............');

    return Promise.reject(err);
}

// before return response
const beforeRes = async (res) => {
    console.log('before return response............');

    const data = res.data;
    console.log('data.error', data.error);
    if (data && data.error === 'ERROR_ACCESS_TOKEN') {

        const memberCookieValue = getCookie('member');

        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);

        // 새로운 accessToken과 refreshToken을 응답받는다.
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie('member', JSON.stringify(memberCookieValue), 1); // 어차피 refresh로 계속 토큰을 받을 수 있기 때문에 1로 설정

        // 에러가 났었기 때문에 원래 하려 했던 작업을 재호출
        const originalRequest = res.config;

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return axios(originalRequest);
    }

    return res;
}

// fail response
const responseFail = (err) => {
    console.log('response fail error................');

    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail); // api 요청 전 실행
jwtAxios.interceptors.response.use(beforeRes, responseFail); // api 요청 후 응답 받기 전


export default jwtAxios;