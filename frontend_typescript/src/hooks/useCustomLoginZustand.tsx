import {Navigate, useNavigate} from "react-router"
import {useEffect} from "react"
import {getCookie} from "../util/cookieUtil"
import {useZustandMember} from "../zstore/useZustandMember.ts";


const useCustomLogin = () => {

  const { member, status, login, logout, save } = useZustandMember()

  //로그인 상태 객체
  const loginState = member
 
  //로그인 여부 
  const loginStatus = status //fulfilled, pending, rejected

  useEffect(()=> {

    if(! loginStatus ) {

      const cookieData = getCookie("member")

      if(cookieData){
        save(cookieData)
      }

    }

  }, [])

 
  const navigate = useNavigate()
 
  const doLogin = async (email:string, pw:string) => {
    login(email, pw)
  }

  const doLogout = () => {
    logout()
  }
  const moveToLogin = () => {
    navigate("/member/login")
  }
  const moveToLoginReturn = () => { //--------로그인 페이지로 이동 컴포넌트 
    return <Navigate replace to="/member/login"/>
  }
     
  const moveToPath = (path:string) => { //----------------페이지 이동 
    navigate({pathname: path}, {replace:true})
  }
    

  return {loginState, loginStatus, doLogin, doLogout,moveToLogin,moveToLoginReturn,moveToPath}

}

export default useCustomLogin

