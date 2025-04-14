

const rest_api_key = '13df2264aba336ef247b64427760f14b';
const redirect_uri = 'http://localhost:3000/member/kakao';
const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'; // 인가 코드 발급 url

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL;
}