import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest styles handpicked just for you. Upgrade your wardrobe with the season’s latest trends!
        </p>
      </div>

      {/* Horizontal Product Slider */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 px-4 pb-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 snap-x snap-mandatory">
          {latestProducts.map((item, index) => (
            <div
              key={index}
              className="min-w-[200px] sm:min-w-[220px] md:min-w-[250px] snap-start"
            >
              <ProductItem
                id={item._id}
                images={item.images}
                price={item.price}
                name={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollections;
