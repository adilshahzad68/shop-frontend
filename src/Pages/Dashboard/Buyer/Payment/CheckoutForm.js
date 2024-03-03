import { async } from '@firebase/util';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ booking }) => {
    console.log(booking)
    const { price, book, img, buyerName, buyerEmail, location, sellerName, sellerEmail } = booking;

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:10000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('bookToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:10000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('bookToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault()



        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );


        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                price,
                book,
                transactionId: paymentIntent.id,
                buyerEmail,
                sellerEmail: sellerEmail,
                bookingId: booking._id
            }
            fetch('http://localhost:10000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('bookToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        toast.success("Payment Successfull !")
                    }
                })
        }

        setProcessing(false)

    }
    return (
        <div className='mr-10'>
            <form onSubmit={handleSubmit}>
                <CardElement className='shadow-xl p-10 rounded-md'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn my-7'
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            <p className="text-red-500 font-semibold">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;