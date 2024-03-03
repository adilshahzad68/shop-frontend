import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import BigLoading from '../../../../Components/Loading/BigLoading';
import NoElements from '../../NoElements/NoElements';

const ReportAdmin = () => {

    const { data: reportedItems = [], refetch, isLoading } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: () => fetch('https://shop-backend-sigma.vercel.app/books/reported', {
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
    })

    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://shop-backend-sigma.vercel.app/books/reported/${id}`, {
            method: "DELETE",
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    toast.success("Delete Successfully !")
                    refetch()
                }
            })
    }
    console.log(reportedItems)
    if (isLoading) {
        return <BigLoading></BigLoading>
    }
    if (reportedItems.length < 1) {
        return <NoElements item="Reported Items"></NoElements>
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
                            <th>Seller Email</th>

                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            reportedItems.map((reportedItem, i) => <tr key={reportedItem._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={reportedItem.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{reportedItem.name}</div>
                                            <div className="text-sm opacity-50">By {reportedItem.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {reportedItem.resalePrice}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Original Price {reportedItem.originalPrice}</span>
                                </td>
                                <td>{reportedItem.status}</td>
                                <td>{reportedItem.sellerEmail}</td>

                                <th>
                                    <button className="btn btn-accent " onClick={() => handleDelete(reportedItem._id)}>Delete</button>
                                </th>
                            </tr>)
                        }


                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default ReportAdmin;