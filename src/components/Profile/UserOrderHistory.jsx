import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('https://book-store-12.onrender.com/api/bookstore/get-order-history', {
          headers: { authorization: `Bearer ${token}`, id: localStorage.getItem("id") },
        });
        console.log(response);
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [token]);

  const getOrderStatus = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className='font-semibold text-green-500'>{status}</span>;
      case 'Cancelled':
        return <span className='font-semibold text-red-500'>{status}</span>;
      case 'Dispatched':
        return <span className='font-semibold text-yellow-500'>{status}</span>;
      default:
        return <span className='font-semibold text-gray-500'>requested</span>;
    }
  };

  return (
    <div className='min-h-screen p-4 md:p-8 text-zinc-100 bg-zinc-900'>
      {orderHistory.length === 0 ? (
        <div className='h-full flex flex-col items-center justify-center'>
          <h1 className='text-2xl md:text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
        </div>
      ) : (
        <>
          <h1 className='text-2xl md:text-5xl font-semibold text-zinc-500 mb-8'>Your Order History</h1>
          <div className='hidden md:flex bg-zinc-800 w-full justify-center  items-center rounded py-2 px-4'>
            <div className='w-[5%]'><h2 className='text-center'>Sr.</h2></div>
            <div className='w-[25%] ml-3'><h2>Book</h2></div>
            <div className='w-[40%]'><h2>Description</h2></div>
            <div className='w-[10%]'><h2>Price</h2></div>
            <div className='w-[20%]'><h2>Status</h2></div>
          </div>
          {orderHistory.map((order, idx) => (
            <div key={idx} className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex flex-col md:flex-row gap-2 md:gap-4 hover:bg-zinc-900 hover:border-2'>
              <div className='w-full md:w-[5%]'><h2 className='text-center'>{idx + 1}</h2></div>
              <div className='w-full md:w-[25%]'>
                {order.book ? (
                  <Link to={`/view-book-details/${order.book._id}`} className='hover:text-blue-300'>
                    {order.book.title}
                  </Link>
                ) : (
                  <span>Unknown Book</span>
                )}
              </div>
              <div className='w-full md:w-[40%]'>
                {order.book ? (
                  <h2>{order.book.desc.slice(0, 50)}...</h2>
                ) : (
                  <span>No Description Available</span>
                )}
              </div>
              <div className='w-full md:w-[10%] flex m-1'>
                <p>$</p>
                {order.book ? <p>{order.book.price}</p> : <p>N/A</p>}
              </div>
              <div className='w-full md:w-[20%]'>{getOrderStatus(order.status)}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserOrderHistory;
