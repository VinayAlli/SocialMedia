import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"

export const Navbar=()=>{
    const [user]=useAuthState(auth);
    const signout= async ()=>{
        await signOut(auth);
    }
    return (
    <div className="navbar">
        <p><Link style={{color: 'white'}} to="/">Home</Link></p>
        {!user && <p><Link style={{color: 'white'}} to="/login">Login</Link></p>}
        {user && <p><Link style={{color: 'white'}} to="/createpost">Create Post</Link></p>}
    
        {user && (
        <div className="user">
        <div className="profile">
        <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""} alt="profile" width="70" height="50" style={{borderRadius:'5px'}}/>

        </div>
        <button className="btn btn-light btn-sm" onClick={signout}>Logout</button>
        </div>
        )}
    </div> )
}