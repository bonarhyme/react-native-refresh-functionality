import React, { useState } from 'react';
import axios from 'axios';

export const FETCH_RESULTS = 10;
export const MAX_LENGTH = 50;

export const useFetchUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const getUsers = async (currentPage, isTop = false) => {
    setIsLoading(true);
    setSuccess(false);
    setErrorMessage('');
    try {
      const { data } = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=${FETCH_RESULTS}`
      );

      if (isTop) {
        const newList = [...data?.results, ...users];
        const slicedUsers = [...newList].slice(0, MAX_LENGTH);

        setUsers(slicedUsers);
      }

      if (!isTop) {
        const randomIndex = () => Math.ceil(Math.random() * 10);
        const newList = [...users, ...data?.results];
        const slicedUsers = [...newList].slice(-1 * MAX_LENGTH + randomIndex());

        setUsers(slicedUsers);
      }

      setSuccess(true);
    } catch (error) {
      const theError =
        error?.response && error.response?.data?.message
          ? error?.response?.data?.message
          : error?.message;
      setErrorMessage(theError);
    }
    setIsLoading(false);
  };

  return { users, isLoading, success, getUsers, errorMessage };
};
