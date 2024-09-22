import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import BigLoading from '../../../../Components/Loading/BigLoading';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import NoElements from '../../NoElements/NoElements';

const MyBuyers = () => {
    const { user } = useContext(AuthContext)
    const { data: myBuyers = [], refetch, isLoading } = useQuery({
        queryKey: ['myBuyers'],
        queryFn: () => fetch(`https://shop-backend-sigma.vercel.app/bookings/${user?.email}`, {
            headers: {

                authorization: `bearer ${localStorage.getItem("bookToken")}`
            }
        })
            .then(res => res.json())
    })

    if (isLoading) {
        return <BigLoading></BigLoading>
    }
    if (myBuyers.length < 1) {
        return <NoElements item="Buyers"></NoElements>
    }console.log(myBuyers)
    return (
        <div>
            {myBuyers.length}


            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myBuyers?.map((myBuyer, i) => <tr key={myBuyer._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>{myBuyer.buyerName}</td>
                                <td>{myBuyer.phone}</td>
                                <td>{myBuyer.buyerEmail}</td>
                                <td>{myBuyer.location}</td>

                            </tr>)
                        }


                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default MyBuyers;