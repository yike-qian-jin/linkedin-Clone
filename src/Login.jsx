import "./Login.css";
import linkedinFull from "./images/linkedinFull.png";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { useState } from "react";

function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password).then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL,
            }))
        }).catch(error => alert(error))
    }

    const register = (e) => {
        e.preventDefault();
        if (!name) {
            return alert("Please enter a full name")
        }
        createUserWithEmailAndPassword(auth, email, password).then((userAuth) => {
            updateProfile(userAuth.user, {
                displayName: name,
                photoURL: profilePic,
            }).then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic,
                }))
            })
        }).catch(error => console.error(error))
    };

    return (
        <div className='login'>
            <img src={linkedinFull} alt="" />
            <form action="">
                <input type="text" placeholder='Full Name (required if registering)' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Profile pic URL (optional)' value={profilePic} onChange={e => setProfilePic(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type='sumbit' onClick={loginToApp}>Sign In</button>
            </form>
            <p>
                Not a member ?
                <span className='login__register' onClick={register}> Register Now</span>
            </p>
        </div>

    )
}

export default Login