import React from 'react';
import Categories from '../Categories/Categories';
import HomeBanner from '../HomeBanner/HomeBanner';
import AboutUs from '../AboutUs/AboutUs';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: () => fetch('http://localhost:10000/booksAd')
            .then(res => res.json())
    })
    if (books.length <= 0) {
        return (
            <div className='md:w-3/4 w-full p-5 mx-auto space-y-36'>
                <HomeBanner></HomeBanner>
                <Categories></Categories>
                <AboutUs></AboutUs>
            </div>
        )
    }
    return (
        <div className='md:w-3/4 w-full p-5 mx-auto space-y-36'>
            <HomeBanner></HomeBanner>
            <Categories></Categories>
            <AdvertiseItems></AdvertiseItems>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;