import React from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import Booking from './Booking';

const Book = ({ book, setModalBook }) => {

    const handleReport = (id) => {
        console.log(id)
        fetch(`http://localhost:10000/books/report/${id}`, {
            method: "PUT",
            headers: {
                "content-type": 'application/json',
                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success("Reported Successfully !")
            })
    }
    // console.log(book)
    const { name, author, img, originalPrice, resalePrice, location, verify, post, sellerName, summery, yearOfUse, yearOfPurchase } = book
    return (
        <div className="card rounded-none bg-base-100 ">
            <figure><img src={img} className='h-96 w-full' alt="Shoes" /></figure>
            <div className="card-body px-0">
                <div className='flex justify-between'>
                    <div>
                        <h2 className="card-title font-bold text-3xl">{name}</h2>
                        <small className='text-base text-gray-500'>{author}</small>
                    </div>
                    <div className='-mt-5'>
                        <h2 className='text-base font-semibold text-white btn-primary rounded-2xl p-1 text-center'>{location}</h2>
                        <small className='text-gray-500 text-sm'>{post.slice(0, 15)}</small>
                    </div>
                </div>
                <div className=''>
                    <p className='w2'>{summery}</p>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p><span className='text-primary font-medium'>Resale Price :</span> ${resalePrice}</p>
                        <p><span className='text-primary font-medium'>Original Price :</span> ${originalPrice}</p>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <p><span className='text-primary font-medium'>Seller's Name :</span>{sellerName}</p>
                            {
                                verify && <FaCheckCircle className='text-blue-600'></FaCheckCircle>
                            }
                        </div>
                        <p><span className='text-primary font-medium'>Used For :</span> {yearOfUse} year</p>
                    </div>
                </div>
                <div className="card-actions justify-end my-3">

                    <div className="flex gap-6">
                        <label htmlFor="book" className="btn btn-primary " onClick={() => handleReport(book._id)}>Report</label>
                        <label htmlFor="book" className="btn btn-primary " onClick={() => setModalBook(book)}>Buy Now</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Book;