import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// Custom hook
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
   

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const {username} = getUsername();
        const { data, status } =!query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api${query}`);

        if (status === 200) {
          setData((prev) => ({ ...prev, isLoading: false, apiData: data, status }));
        } else {
          setData((prev) => ({ ...prev, isLoading: false, status }));
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
