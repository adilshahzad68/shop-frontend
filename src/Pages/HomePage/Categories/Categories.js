import React, { useEffect, useState } from 'react';
import Category from './Category';
import BigLoading from '../../../Components/Loading/BigLoading';

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('http://localhost:10000/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data)
                setLoading(false);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    if (loading) {
        return <BigLoading></BigLoading>
    }

    return (
        <div>
            <h2 className='text-primary text-4xl font-semibold text-center my-16'>Choose Your Own Category</h2>
            <div className='grid grid-cols-1  lg:grid-cols-3 gap-10'>
                {

                    categories.map(category => <Category key={category._id} category={category}></Category>)

                }
            </div>
        </div>
    );
};

export default Categories;