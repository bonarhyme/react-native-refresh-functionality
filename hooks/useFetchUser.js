import React, { useState } from 'react';
import axios from 'axios';

export const useFetchUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getUsers = async (currentPage) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { data } = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=10`
      );
      // setUsers(data?.results);
      setUsers([...users, ...data?.results]);
    } catch (error) {
      const theError =
        error?.response && error.response?.data?.message
          ? error?.response?.data?.message
          : error?.message;
      setErrorMessage(theError);
    }
    setIsLoading(false);
  };

  return { users, isLoading, getUsers, errorMessage };
};
