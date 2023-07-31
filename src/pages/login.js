import { signInWithPopup } from "firebase/auth"
import { auth,provider } from "../config/firebase"
import { useNavigate } from "react-router-dom"

export const Login=()=>{
    const navigate=useNavigate();
    const signinwithgoogle= async ()=>{
        const result= await signInWithPopup(auth,provider);
        console.log(result);
        navigate("/");
    }
    return(
    <div className="login">
        <p>Sign in with Google to continue </p>
        <button onClick={signinwithgoogle}>Sign in with Google</button>
    </div>)
}