import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GrLanguage } from 'react-icons/gr';
import logo from '../../../public/img.jpg';
import { useSelector } from 'react-redux';
import UserActions from '../Utils/UserActions';
import AdminActions from '../Utils/AdminActions';
const BookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [heartColor, setHeartColor] = useState(false);
    const [cartColor, setCartColor] = useState(false);
    const isLogin = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://book-store-12.onrender.com/api/bookstore/get-book-by-id/${id}`);
                setData(response.data.data || []);
                const isFavorited = localStorage.getItem(`fav_${id}`);
                if (isFavorited === 'true') {
                    setHeartColor(true);
                }
                const isAddedToCart = localStorage.getItem(`cart_${id}`);
                if (isAddedToCart === 'true') {
                    setCartColor(true);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleFavoriteToggle = async () => {
        try {
            if (heartColor) {
                await removeFromFavorite();
                localStorage.removeItem(`fav_${id}`);
            } else {
                await addToFavorite();
                localStorage.setItem(`fav_${id}`, 'true');
            }
            setHeartColor(!heartColor);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const addToFavorite = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                authorization: `Bearer ${token}`,
                id: localStorage.getItem("id"),
                bookid: id,
            };
            await axios.put(`https://book-store-12.onrender.com/api/bookstore/add-to-fav`, {}, { headers });
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorite = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                authorization: `Bearer ${token}`,
                id: localStorage.getItem("id"),
                bookid: id,
            };
            await axios.put(`https://book-store-12.onrender.com/api/bookstore/remove-from-fav`, {}, { headers });
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const handleCartToggle = async () => {
        try {
            if (cartColor) {
                await removeFromCart();
                localStorage.removeItem(`cart_${id}`);
            } else {
                await addToCart();
                localStorage.setItem(`cart_${id}`, 'true');
            }
            setCartColor(!cartColor);
        } catch (error) {
            console.error('Error toggling cart:', error);
        }
    };

    const addToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                authorization: `Bearer ${token}`,
                id: localStorage.getItem("id"),
                bookid: id,
            };
            await axios.put(`https://book-store-12.onrender.com/api/bookstore/add-to-cart`, {}, { headers });
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                authorization: `Bearer ${token}`,
                id: localStorage.getItem("id"),
            };
            await axios.put(`https://book-store-12.onrender.com/api/bookstore/remove-from-cart/${id}`, {}, { headers });
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    
    return (
        <>
            {data && (
                <div className='min-h-screen flex flex-col'>
                <div className='flex-grow px-4 md:px-8 lg:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row'>
                    <div className='bg-zinc-800  p-16 rounded px-4 py-12 w-full lg:w-1/2 flex flex-col items-center justify-center'>
                        <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full'>
                            <img src={data.url} alt="Logo" className='w-full lg:w-auto lg:max-h-[50vh] h-auto max-h-[40vh] rounded object-cover' />
                            <div className='flex flex-col items-center lg:items-start gap-4'>
                                {isLogin && role === "user" && (
                                    <UserActions
                                        heartColor={heartColor}
                                        cartColor={cartColor}
                                        handleFavoriteToggle={handleFavoriteToggle}
                                        handleCartToggle={handleCartToggle}
                                    />
                                )}
                                {isLogin && role === "admin" && (
                                    <AdminActions bookId={data._id}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='p-4 w-full lg:w-1/2 flex flex-col justify-center'>
                        <h1 className='text-3xl md:text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
                        <p className='text-zinc-400 mt-1 text-base md:text-lg'>{data.author}</p>
                        <p className='text-zinc-400 mt-4 text-lg md:text-xl'>{data.desc}</p>
                        <p className='text-zinc-400 flex mt-4 items-center text-base md:text-lg'>
                            <GrLanguage className='mr-3' />
                            {data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold'>Price: ${data.price}</p>
                    </div>
                </div>
                
            </div>
            
            
            )}
        </>
    );
};

export default BookDetails;
