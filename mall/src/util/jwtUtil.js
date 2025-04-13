import axios from "axios";
import {getCookie} from "./cookieUtil";

const jwtAxios = axios.create();


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