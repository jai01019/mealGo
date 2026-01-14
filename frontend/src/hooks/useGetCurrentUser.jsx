import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

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
        console.log("error while fetching current user", err);
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
