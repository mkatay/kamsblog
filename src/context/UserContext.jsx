import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,
createUserWithEmailAndPassword, 
updateProfile,
sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../utility/firebaseApp';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState(null)
  const navigate=useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logoutUser=async ()=>{
    await signOut(auth) 
    if(location.pathname=='/create' || location.pathname=='/profile')
          navigate('/')   
console.log('logoutUser');
  }
  const loginUser=async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password)
      setMsg('')
      navigate('/')
      }catch(err){
        console.log(err.message)
        setMsg(err.message)
    }
  }

 
  const signUpUser=async (email,password/*,displayName*/)=>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
     // await updateProfile(auth.currentUser,{displayName})
      //sendEmailLink(email)
      alert('sikeres regisztráció!')
      setMsg('')
      navigate('/')
   }catch(err){
       console.log(err.message)
       setMsg(err.message)
   }
  }

  const resetPassword=async (email)=>{
    try{
      await sendPasswordResetEmail(auth,email)
      alert('jelszómódosítási link elküldve....');
      navigate('/signinup/in')
    }catch(err){
      console.log(err.message);
      setMsg(err.message)
    }
  }

    return (
    <UserContext.Provider value={{ user,logoutUser,loginUser,signUpUser, resetPassword,msg,setMsg}}>
      {children}
    </UserContext.Provider>
  );
};
