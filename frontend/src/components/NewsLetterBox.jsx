import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Subscribe to our newsletter and get the latest updates on new arrivals, special offers, and exclusive discounts.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='enter your email' required/>
            <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
    </div>
  ) //Storing emails in your backend (create a newsletter collection in MongoDB)
}

export default NewsLetterBox