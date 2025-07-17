import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const {navigate, token, setCartItems, backendUrl}=useContext(ShopContext)
    const [searchParams, setSearchParams]=useSearchParams()

    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')

    const verifyPayment=async ()=>{
        try {

            if(!token){
                return null
            }

            const response=await axios.patch(`${backendUrl}/api/orders/verifystripe`, {success, orderId}, {headers:{token}})
            console.log(response)
            if(response.data.success){
                setCartItems({})
                navigate('/orders')
                toast.success(response.data.msg)
            }
            else{
                navigate('/cart')
                toast.error(response.data.message)
            }

        }catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
