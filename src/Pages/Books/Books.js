import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Book from './Book';
import Booking from './Booking';

const Books = () => {
    const books=useLoaderData()
    const[modalBook,setModalBook]=useState(null)
    // console.log(books)
    return (
        <div className='md:grid grid-cols-2 gap-20 w-3/4 mx-auto my-12'>
            {
                books.map(book=><Book book={book} modalBook={modalBook} setModalBook={setModalBook} key={book._id}></Book>)
            }

            {
                modalBook &&
                <Booking book={modalBook} setModalBook={setModalBook}></Booking>
            }
        </div>
    );
};

export default Books;