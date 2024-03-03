import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Category = ({ category }) => {
    // console.log(category)
    return (
        <div className="card  h-72 bg-base-100 shadow-xl image-full">
            <figure><img src={category.img} className='w-full' alt="Shoes" /></figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title mt-24 text-4xl">{category.genre}</h2>

                <Link to={`/categories/${category.genre}`}>
                    <div className="card-actions justify-end">
                        <button className="flex items-center text-xl">See Collections <FaArrowRight className=' ml-3'></FaArrowRight></button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Category;