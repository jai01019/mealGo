import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setShopData } from '../redux/ownerSlice';
import { useState } from 'react';
function useGetMyShop() {
  const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchShop = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/shop/getShop`,
          { withCredentials: true }
        );
         
        //console.log("Fetched shop :", result.data);
        //console.log("Fetched shop data:", result.data.shop);
        dispatch(setShopData(result.data.shop)); // ✅ ONLY SHOP


      } catch (err) {
        console.log("error while fetching current shop", err);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchShop();
  }, []);
}

export default useGetMyShop;
