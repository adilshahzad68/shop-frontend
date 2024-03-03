import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import BigLoading from '../../../../Components/Loading/BigLoading';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import NoElements from '../../NoElements/NoElements';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myProducts'],
        queryFn: () => fetch(`https://shop-backend-sigma.vercel.app/books/${user?.email}`)
            .then(res => res.json())
    })

    console.log(myProducts)
    // delete
    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://shop-backend-sigma.vercel.app/books/${id}`, {
            method: "DELETE",
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
            })
    }
    // advertise
    const handleAdvertise = (id) => {
        console.log(id)
        fetch(`https://shop-backend-sigma.vercel.app/books/${id}`, {
            method: "PUT",
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {

                    console.log(data)
                    refetch()
                    toast.success("Advertise Successfully !")
                }
            })
    }


    if (isLoading) {
        return <BigLoading></BigLoading>
    }
    if (myProducts.length < 1) {
        return <NoElements item="Products"></NoElements>
    }
    return (
        <div>


            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myProducts.map((myProduct, i) => <tr key={myProduct._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={myProduct.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{myProduct.name}</div>
                                            <div className="text-sm opacity-50">By {myProduct.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {myProduct.resalePrice}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Original Price {myProduct.originalPrice}</span>
                                </td>
                                <td>{myProduct.status}</td>
                                <th>
                                    {
                                        myProduct.advertise &&
                                        <button className="btn btn-accent ">Done</button>
                                    }
                                    {
                                        !myProduct.advertise &&
                                        <button className="btn btn-accent " onClick={() => handleAdvertise(myProduct._id)}>Advertise</button>
                                    }
                                </th>
                                <th>
                                    <button className="btn btn-accent " onClick={() => handleDelete(myProduct._id)}>Delete</button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProducts;