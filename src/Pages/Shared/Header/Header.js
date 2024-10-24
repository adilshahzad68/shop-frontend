import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';


const Header = () => {
  const { user, logOut } = useContext(AuthContext)

  // console.log(user)
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(er => console.error(er))
  }


  const [navbar, setNavbar] = useState(false);



  return (
    <nav className='w-full   bg-white ' >
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>

            {/* logo */}

            <Link to="/">
              <div className='flex items-center'>
                <img src="{logo}" className="w-12 rounded-full" alt="" />
                <h2 className='text-2xl ml-2 font-bold text-primary  hover:text-indigo-600'>Buy&Sell Store!</h2>
              </div>
            </Link>

            {/* header */}

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                <Link to="/">Home</Link>
              </li>
              <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                <Link to="/blog">Blog</Link>
              </li>

              {user?.uid ?

                <>
                  <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                    <Link onClick={handleLogOut} >Log Out</Link>
                  </li>
                  <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                    <Link to='/dashboard' >Dashboard</Link>
                  </li>
                  <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                    <Link >
                      <div className="tooltip tooltip-bottom" data-tip={user?.displayName ? user?.displayName : "User"}>
                        <button ><img className='rounded-full w-10' src={user?.photoURL ? user?.photoURL : <FaUserCircle></FaUserCircle>} alt="" /></button>
                      </div>
                    </Link>
                  </li>
                </>
                :
                <>
                  <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                    <Link to="/login">Log In</Link>
                  </li>
                  <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                    <Link to="/register">Sign Up</Link>
                  </li>
                </>

              }


            </ul>


          </div>

        </div>

      </div>


    </nav>
  );
};

export default Header;