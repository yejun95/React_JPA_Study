import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { save } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {

  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get("code")

  const navigate = useNavigate()
  //authCode -> Access Token
  useEffect(() => {

    if(authCode){
      getAccessToken(authCode).then(accessToken => {
        console.log("access Token ");
        
        console.log(accessToken)

        getMemberWithAccessToken(accessToken).then(result => {

          console.log("========================")
          console.log(result)

          dispatch(save(result))

          console.log("social: " + result.social)

          if(result.social){
            navigate('/member/modify') //아직 개발이 되지 않은 경로 
          }else {
            navigate('/')
          } 

        })

      })
    }
    

  },[authCode])



  return (
  <>

 </>
)
}
export default KakaoRedirectPage;

