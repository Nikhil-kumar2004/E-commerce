import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct=products.filter((item)=>item.bestseller);
        setBestSeller(bestProduct.slice(0,5));
    },[])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLER'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis excepturi voluptatibus voluptas, exercitationem incidunt nostrum quos sapiente, aliquam dolor quam ab soluta. Quas ab, odio modi ipsa culpa animi deserunt!
            </p>
        </div>

        {/* Horizontal Product Slider */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 px-4 pb-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 snap-x snap-mandatory">
          {bestSeller.map((item, index) => (
            <div
              key={index}
              className="min-w-[200px] sm:min-w-[220px] md:min-w-[250px] snap-start"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                price={item.price}
                name={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestSeller
