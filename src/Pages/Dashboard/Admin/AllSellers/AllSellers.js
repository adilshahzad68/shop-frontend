import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import BigLoading from '../../../../Components/Loading/BigLoading';
import NoElements from '../../NoElements/NoElements';

const AllSellers = () => {
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetch('http://localhost:10000/sellers', {
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
    })
    console.log(sellers)


    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:10000/sellers/${id}`, {
            method: "DELETE",
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success("Delete Successfully !")
                refetch()
            })
    }
    const handleVerify = (id) => {
        console.log(id)
        fetch(`http://localhost:10000/sellers/${id}`, {
            method: "PUT",
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {

                    toast.success("Verify Successfully !")
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <BigLoading></BigLoading>
    }
    if (sellers.length < 1) {
        return <NoElements item="Sellers"></NoElements>
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>

                        </th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Verify</th>
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        sellers.map((seller, i) => <tr key={seller._id}>
                            <th>
                                {i + 1}
                            </th>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>

                                {
                                    !seller.verify &&

                                    <button className="btn btn-accent " onClick={() => handleVerify(seller._id)}>Verify</button>

                                }
                                {
                                    seller.verify &&
                                    <FaCheckCircle className='text-blue-500  w-10 h-10 '></FaCheckCircle>
                                }
                            </td>
                            <td>
                                <button className="btn btn-accent " onClick={() => handleDelete(seller._id)}>Delete</button>
                            </td>


                        </tr>)
                    }


                </tbody>



            </table>
        </div>
    );
};

export default AllSellers;