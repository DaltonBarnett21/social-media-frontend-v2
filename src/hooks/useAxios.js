import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (params, dependency) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const makeRequest = async (config) => {
    setIsLoading(true);
    try {
      const res = await axios.request(config);
      setIsLoading(false);
      setData(res.data);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    makeRequest(params);
  }, [dependency]);

  return [data, isLoading, error, setData];
};
