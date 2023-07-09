import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFetchUser } from '../hooks/useFetchUser';
import { Item } from '../components/Item';
import { Loader } from '../components/Loader';

const BottomLoader = () => {
  const { isLoading, users, errorMessage, getUsers } = useFetchUser();

  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreItem = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        Infinite Bottom Loader
      </Text>

      {users?.length > 0 ? (
        <FlatList
          data={users}
          renderItem={Item}
          keyExtractor={(item) => item?.email}
          ListFooterComponent={Loader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          ListEmptyComponent={<Loader isLoading />}
        />
      ) : null}

      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default BottomLoader;
