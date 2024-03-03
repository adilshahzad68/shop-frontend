import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';

const Booking = ({ book, setModalBook }) => {
    const { user } = useContext(AuthContext)
    console.log(user.displayName)
    const { name, author, img, originalPrice, resalePrice, status, location, post, sellerName, summery, yearOfUse, yearOfPurchase, sellerEmail } = book
    console.log(book)

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target;
        const location = form.place.value;
        const phone = form.phone.value;
        const buyerName = user.displayName;


        const booking = { location, sellerName, phone, img, status, sellerEmail, buyerName, buyerEmail: user.email, book: name, price: resalePrice }


        fetch("https://shop-backend-sigma.vercel.app/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("bookToken")}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setModalBook(null)
                toast.success("Booking Successful!")
            })

    }

    const handleCancel = () => {
        setModalBook(null)
    }
    return (
        <div>
            <input type="checkbox" id="book" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    {/* <label htmlFor="book" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
                    <h3 className="text-lg font-bold">Order "{name}" Now !</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-10'>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="text-base">Book Name</span>
                                </label>
                                <input type="text" placeholder="Type here" disabled defaultValue={book.name} className="input input-bordered w-full " />

                            </div>
                            <div className="form-control w-full max-w-xs ">
                                <label className="label">
                                    <span className="text-base">Price</span>
                                </label>
                                <input type="text" placeholder="Type here" disabled defaultValue={resalePrice} className="input input-bordered w-full" />

                            </div>
                        </div>
                        <div className='flex gap-10'>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="text-base">Name</span>
                                </label>
                                <input type="text" placeholder="Type here" disabled defaultValue={user?.displayName} className="input input-bordered w-full " />

                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="text-base">Email</span>
                                </label>
                                <input type="text" placeholder="Type here" disabled defaultValue={user?.email} className="input input-bordered w-full " />

                            </div>


                        </div>
                        <div className="flex gap-10">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="text-base">Phone Number</span>
                                </label>
                                <input type="number" name='phone' placeholder="Type here" className="input input-bordered w-full" required />

                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="text-base">Meeting Place</span>
                                </label>
                                <input type="text" name='place' placeholder="Type here" className="input input-bordered w-full" required />

                            </div>
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <div className='flex justify-end my-2'>
                                <button type="submit" className='btn '>Buy</button>
                            </div>
                            <div className='flex justify-end my-2'>
                                <button onClick={handleCancel} className='btn '>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;