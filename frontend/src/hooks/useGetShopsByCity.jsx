import axios from 'axios';
import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setShopsLoading,
  setShopsError,
  setShopsByCity
} from '../redux/userSlice';

function useGetShopsByCity(cityParam) {

  const dispatch = useDispatch();


  const reduxCity = useSelector((state) => state.user?.city);

  const city = cityParam || reduxCity;

  const shops = useSelector((state) => state.user.shopsByCity?.[city] || []);

  const isLoading = useSelector((state) => state.user.shopsLoading);

  const error = useSelector((state) => state.user.shopsError);
const hasFetched = useRef(false);

const fetchShops = useCallback(async () => {

  if (!city) return;

  try {

    dispatch(setShopsLoading(true));

    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/shop/getShopsByCity/${city}`,
      { withCredentials: true }
    );

    dispatch(setShopsByCity({
      city,
      shops: result.data.shops
    }));

  }

  catch (err) {

    dispatch(setShopsError(err.message));

  }

}, [city, dispatch]);


useEffect(() => {

  if (city && !hasFetched.current) {

    hasFetched.current = true;

    fetchShops();

  }

}, [city, fetchShops]);

  useEffect(() => {

    if (city && !hasFetched.current) {

      hasFetched.current = true;

      fetchShops();

    }

  }, [city]);


  return { shops, isLoading, error };

}

export default useGetShopsByCity;