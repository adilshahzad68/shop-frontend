import React from 'react';
import { Link } from 'react-router-dom';
import { GiBookCover,GiBookPile } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";


const SellerNav = () => {
    return (
        <div>
           <ul className="">
              <li className=" font-semibold text-lg">
                <Link to="/dashboard/addproduct"><GiBookCover></GiBookCover>Add A Product</Link>
              </li>
              <li className=" font-semibold text-lg">
                <Link to="/dashboard/myproduct"><GiBookPile></GiBookPile>My Products</Link>
              </li>
              <li className=" font-semibold text-lg">
                <Link to="/dashboard/mybuyer"><FaUserAlt></FaUserAlt>My Order</Link>
              </li>
             
              </ul>
        </div>
    );
};

export default SellerNav;