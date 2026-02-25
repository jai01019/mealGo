import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserData,clearUser } from '../redux/userSlice';

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user/current`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data.user)); // ✅ ONLY USER
      } catch (err) {
          dispatch(clearUser());  
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
