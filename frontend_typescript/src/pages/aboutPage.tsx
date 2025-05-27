import { NavLink } from "react-router";
import useCustomLogin from "../hooks/useCustomLogin";


function AboutPage() {

  const {loginStatus, moveToLoginReturn} = useCustomLogin()

  if( ! loginStatus) {
    return moveToLoginReturn()
  }

  return ( 
    <div className=" text-3xl">

      <div className="flex">
        <NavLink to='/'>Main</NavLink>      
      </div>

      <div>About Page</div>
    </div>
  );
}

export default AboutPage;