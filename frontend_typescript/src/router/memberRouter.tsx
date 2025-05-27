import { Suspense, lazy } from "react";
import ModifyPage from "../pages/member/modifyPage";

const Loading = <div>Loading....</div>
const Login = lazy(() => import("../pages/member/loginPage"))
const Logout = lazy(() => import("../pages/member/logoutPage"))
const KakaoRirect = lazy(() => import("../pages/member/kakaoRedirectPage"))
const MemberModify = lazy(() => import("../pages/member/modifyPage"))

export default function memberRouter() {
  return (
  {
    path: "member",
    children: [
    {
      path: "login",
      element: <Suspense fallback={Loading}><Login/></Suspense>,
    },
    {
      path: "logout",
      element: <Suspense fallback={Loading}><Logout/></Suspense>,
    },
    {
      path: "kakao",
      element: <Suspense fallback={Loading}><KakaoRirect/></Suspense>,
    },
    {
      path: "modify",
      element: <Suspense fallback={Loading}><ModifyPage/></Suspense>,
    },
  ]
 }
 )
}
