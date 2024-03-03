import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BuyerNav = () => {
    return (
        <div>
             <ul className="">
                <li className=" font-semibold text-lg">
                    <Link to="/dashboard/my-orders"><FaBookOpen></FaBookOpen> My Orders</Link>
                </li>
                


            </ul>
        </div>
    );
};

export default BuyerNav;