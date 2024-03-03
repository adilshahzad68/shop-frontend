import React from 'react';
import { Link } from 'react-router-dom';

const AdvertiseItem = ({ advertiseItem }) => {
    const { name,img,resalePrice,originalPrice,author,summery } = advertiseItem
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img}  alt="Shoes" className="rounded-xl h-48" />
            </figure>
            <div className="card-body items-center text-center">
            <div>
                        <h2 className="card-title font-bold ">{name}</h2>
                        <small className='text-base text-gray-500'>{author}</small>
                    </div>
                <p>{`${summery.slice(0,150)} Read More...`}</p>
              
            </div>
        </div>
    );
};

export default AdvertiseItem;