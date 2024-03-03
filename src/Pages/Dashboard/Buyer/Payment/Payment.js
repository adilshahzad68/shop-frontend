


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import BigLoading from '../../../../Components/Loading/BigLoading'
import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const stripePromise = loadStripe("pk_test_51OpSpzH3E5J344FHjABIE8KGLF13ng0p2ZrBB8FCAra9JZjdxvZLNwEV2Cd08iLdeJ2lX1WtTn5BZareXupEkPM000PCj4fITT");


const Payment = () => {
    const booking = useLoaderData();
    console.log(stripePromise)
    console.log(booking)

    const { price,book,img,buyerName,buyerEmail,location,sellerName} = booking;
    
    return (
        <div className='text-center mt-16 p-2'>
            <h3 className="text-3xl">Payment for {book}</h3>
            {/* <p className="text-xl">Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</p> */}
            <div className='w-96 my-12 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;