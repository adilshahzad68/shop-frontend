import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/404.jpg';
const ErrorElement = () => {
    return (
        <div className='w-3/4 mx-auto text-center'>
            <img src={error} className=' w-3/4 mx-auto ' alt="" />
            <Link to='/' className='btn bg-[#f94144] border-none hover:bg-[#c05052] text-white'>BACK TO HOMEPAGE</Link>
        </div>
    );
};

export default ErrorElement;