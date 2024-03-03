import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';
import useSeller from '../../../Hooks/useSeller';
import AdminNav from '../Admin/AdminNav/AdminNav';
import BuyerNav from '../Buyer/BuyerNav/BuyerNav';
import SellerNav from '../Seller/SellerNav/SellerNav';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext)
    // const [Seller,setSeller]=useState(false)
    const [isSeller] = useSeller(user?.email)
    const [isAdmin] = useAdmin(user?.email)
    // console.log(isSeller)
    return (
        <div>
            {/* Branding & Profile Info */}
            <div className=''>
                <h2 className='text-3xl cursor-pointer font-semibold text-center text-primary '>
                    <Link to='/'>Buy & Sell</Link>
                </h2>
                <div className='flex flex-col items-center mt-6 -mx-2'>
                    <Link to='/dashboard'>
                        <img
                            className='object-cover w-24 h-24 mx-2 my-6 rounded-full'
                            src={user?.photoURL}
                            alt='avatar'
                            referrerPolicy='no-referrer'
                        />
                    </Link>
                    <Link to='/dashboard'>
                        <h4 className='mx-2 mt-2 font-medium text-primary text-xl  hover:underline'>
                        {user?.displayName} {isAdmin && !isSeller ? "(Admin)": isSeller && !isAdmin ? "(Seller)" : " (Buyer)"}
                        </h4>
                    </Link>
                    <Link to='/dashboard'>
                        <p className='mx-2 mt-1 text-sm font-medium text-primary  hover:underline'>
                            {user?.email}
                        </p>
                    </Link>
                </div>
            </div>

            {/* Nav Items */}
            <div className='flex flex-col justify-between flex-1 mt-6'>
                <nav>
                    {
                        isSeller && !isAdmin && <SellerNav></SellerNav>
                    }
                    {
                        isAdmin && !isSeller && <AdminNav></AdminNav>
                    }
                    {
                        !isAdmin && !isSeller && <BuyerNav></BuyerNav>
                    }
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;