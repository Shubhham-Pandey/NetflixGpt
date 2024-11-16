import React, {useRef, useState} from 'react'
import Header from './Header';
import { checkValidateFields } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState({});
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputFullNameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get validation result from the checkValidateFields function
    const message = checkValidateFields(inputEmailRef.current.value, inputPasswordRef.current.value);
    console.log("message ", message);
    
    // Set error message state
    setErrorMessage(message);
  
    // Check if the message object is empty (i.e., no validation errors)
    if (Object.keys(message).length === 0) {
      
      // Make the API call based on the form type (sign-up or sign-in)
      if (!isSignInForm) {
        console.log("sign in called")
        // Sign Up Logic
        createUserWithEmailAndPassword(
          auth,
          inputEmailRef.current.value, 
          inputPasswordRef.current.value
        ).then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: inputFullNameRef.current.value,
            photoURL: USER_AVATAR,
          }).then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
      }else {
        signInWithEmailAndPassword(auth, inputEmailRef.current.value, inputPasswordRef.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            setFirebaseErrorMessage(`${error?.code} ${error?.message}`);
          });
      }
    } else {
      // Handle case when there are validation errors
      console.log("Validation errors found, not making API call");
    }
  };
  

  return (
    <div>
        <Header />
        <div className='absolute'>
          <img
              src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg"
              alt="NetFlix Poster"
          />
        </div>
        <form
          onSubmit={handleSubmit} 
          className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        > 
          <h1>{ isSignInForm ? "Sign In" : "Sign Up"}</h1>
          <p className="text-red-500">{firebaseErrorMessage}</p>
          {!isSignInForm && (
            <input 
              ref={inputFullNameRef}
              type='text'
              placeholder='Full Name'
              className="p-4 my-4 w-full bg-gray-700"            
            />
          )}
          <input
            ref={inputEmailRef}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          { (typeof errorMessage != "undefined" && errorMessage?.email) ? <p className='text-red-500'>{errorMessage?.email}</p> : "" }
          <input
            ref={inputPasswordRef}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          { typeof errorMessage != "undefined" && errorMessage?.password ? <p className='text-red-500'>{errorMessage?.password}</p> : "" }
          <button
            type="submit"
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
          >
          { isSignInForm ? "Sign In" : "Sign Up" }
          </button>
          { isSignInForm ? 
            (
              <p 
                className='cursor-pointer'
                onClick={() => setIsSignInForm(!isSignInForm)}
              > New to Netflix? Sign up now.
              </p>
            ) : 
            (
              <p 
                className='cursor-pointer'
                onClick={() => setIsSignInForm(!isSignInForm)}
                >Already have account ? Sign In
              </p>
            ) 
          }
        </form>
    </div>
  )
}

export default Login