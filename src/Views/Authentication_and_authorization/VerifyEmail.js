import { Navigate } from "react-router";
import { sendEmailVerification } from "firebase/auth";
import auth from "../../MiddlewareApis/Firebase";
import { useAuth } from "../../MiddlewareApis/AuthContext";
import { useState } from "react";

function VerifyEmail(){

    const {user, setUser,isLoggedIn,SetIsLoggedIn} = useAuth();

    const[isloading,setIsLoading] = useState(false);

    const[verifyClicked,setVerifyClicked] = useState();

    function logout(){
        window.localStorage.clear();
        setUser({});
        SetIsLoggedIn(false);
        return <Navigate to="/" replace={true}/>
    }

    function verify(){
        sendEmailVerification(auth.currentUser).then((value)=>{
            console.log("value: "+value);
            return <Navigate to="/" replace={true}/>
        }).catch((err)=>{
            console.log("error: "+err.message);
        });
    }

    

    //const AuthenticateContext = useAuth();
    if(window.localStorage.getItem("isLoggedIn")){
        if(JSON.parse(window.localStorage.getItem("AuthUser")).user.emailVerified){
            return <Navigate to="/user-dashboard/" replace={true} />
        }else{
            return <div className="signin-form">
                <div className="signin-form-title"><h1>Verify Email</h1></div>
                <div>
                <input className="signin-form-submit" type="button" value={'Verify Email'} onClick={verify}/>
                </div>
                <div>
                <input className="signin-form-submit" type="button" value={'Sign Out'} onClick={logout}/>
                </div>
            </div>
        }
    }else{
        return <Navigate to="/"/>
    }
    
}

export default VerifyEmail;