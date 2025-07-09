import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-10 border-t'>
            <Title text1={'CONTACT'} text2={'US'} />
        </div>
        <div className='my-8 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
            <div className='flex flex-col justify-center gap-6 items-start'>
              <p className='font-semibold text-xl text-gray-600'>Our Store</p>
              <p className='text-gray-500'> Clothify Enterprices <br /> 139, block-59, Delhi-100234</p>
              <p className='text-gray-500'>Tel: (+91) 123456789 <br />Email: admin@clothify.com</p>
              <p className='font-semibold text-xl text-gray-600'>Careers at Clothify</p>
              <p className='text-gray-500'>Learn more about our teams and job opening.</p>
              <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-200'>Explore Jobs</button>
            </div>
        </div>
        <NewsLetterBox/>
    </div>
  )
}

export default Contact
