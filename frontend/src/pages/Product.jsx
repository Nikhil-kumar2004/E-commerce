import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState('');
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];

  const sortedSizes = Array.isArray(productData?.sizes)
  ? [...productData.sizes].sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
  : [];

  const fetchProduct = async () => {

    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.images[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProduct();
  }, [products, productData, productId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Products Images */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.images.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt='' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info. */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-1'>
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-3 text-2xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-2 my-6'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                sortedSizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-1 px-3 bg-gray-100 ${item === size && size ? 'border-orange-500' : 'border-white'
                      }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-5 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of
            products or services over the internet. It serves as a virtual marketplace businesses and
            individuals can showcase their products, interact with customers, and conduct transactions
            without the need for a physical presence. E-commerce websites have gained immense popularity
            due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce website typically display products and services along with detailed descriptions,
            images, prices and any available variations(e.g. sizes, colors). Each product usually has its
            own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* Display Related Products */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
