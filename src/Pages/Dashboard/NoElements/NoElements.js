import React from 'react';

const NoElements = ({item}) => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <h2 className='md:text-7xl text-primary font-bold'>No {item} Available</h2>
        </div>
    );
};

export default NoElements;