import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiseItem from './AdvertiseItem';

const AdvertiseItems = () => {
    const { data: advertiseItems = [] } = useQuery({
        queryKey: ['advertiseItems'],
        queryFn: () => fetch('https://shop-backend-sigma.vercel.app/advertiseBooks')
            .then(res => res.json())
    })
    if (advertiseItems) {

        return (
            <div>
                <h2 className='text-primary text-4xl font-semibold text-center my-16'>Ours Collection</h2>
                <div className='grid grid-cols-1  lg:grid-cols-3 gap-20'>
                    {
                        advertiseItems.map(advertiseItem => <AdvertiseItem key={advertiseItem._id} advertiseItem={advertiseItem}></AdvertiseItem>)
                    }
                </div>
            </div>
        );
    }
};

export default AdvertiseItems;