import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import NoElements from '../../NoElements/NoElements';

const AllBuyers = () => {
    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch('https://shop-backend-sigma.vercel.app/buyers', {
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
    })
    console.log(buyers)


    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://shop-backend-sigma.vercel.app/buyers/${id}`, {
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


    if (isLoading || buyers.length === 0) {
        return <NoElements item="Buyers"></NoElements>
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
                        {/* <th>Verify</th> */}
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        buyers.map((buyer, i) => <tr key={buyer._id}>
                            <th>
                                {i + 1}
                            </th>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>
                            {/* <td>
                                <button className="btn btn-accent " onClick={() => handleVerify(buyer._id)}>Verify</button>
                            </td> */}
                            <td>
                                <button className="btn btn-accent " onClick={() => handleDelete(buyer._id)}>Delete</button>
                            </td>

                        </tr>)
                    }


                </tbody>



            </table>
        </div>
    );
};

export default AllBuyers;