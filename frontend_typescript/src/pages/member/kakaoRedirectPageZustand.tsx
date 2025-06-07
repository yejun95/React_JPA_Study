import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {getAccessToken, getMemberWithAccessToken} from "../../api/kakaoApi";
import {useZustandMember} from "../../zstore/useZustandMember.ts";

const KakaoRedirectPage = () => {

  const { save } = useZustandMember()

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

          save(result)

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

