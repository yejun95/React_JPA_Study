import {Cookies} from "react-cookie";


const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days); // 쿠키 보관 기간

    return cookies.set(name, value, {expires: expires, path: '/'}); // path: '/' : 하위 경로 다 포함
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookie = (name, path='/') => {
    cookies.remove(name, {path: path}); // path='/'에 있는 쿠키를 지워라 라는 뜻
}