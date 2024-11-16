import React from 'react'
import { LOGO } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const handleSignOut = () => {
    dispatch(removeUser());
    navigate('/');
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />    
        { user && (
          <div className="flex p-2 justify-between">
           <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
          </div>  
        )}
    </div>
  )
}

export default Header