import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
// import { addUser } from '../utils/userSlice';
const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <Login />
  }, 
  {
    path: "/browse",
    element: <Browse />,
  }
]);


const Body = () => {
  const dispatch = useDispatch(); 

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in: ", user);
        // const { uid, email, displayName, photoURL } = user;
        // dispatch(
        //   addUser({
        //     uid: uid,
        //     email: email,
        //     displayName: displayName,
        //     photoURL: photoURL,
        //   })
        // );
      } else {
        console.log("User signed out");
        dispatch(removeUser());
      }
    });
  })

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body