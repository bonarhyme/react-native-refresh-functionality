import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FETCH_RESULTS, useFetchUser } from '../hooks/useFetchUser';
import { Item } from '../components/Item';
import { Loader } from '../components/Loader';

const BottomLoader = () => {
  const { isLoading, success, users, errorMessage, getUsers } = useFetchUser();

  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreItem = (e) => {
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

      <FlatList
        data={users}
        renderItem={Item}
        keyExtractor={(item) => item?.email}
        ListFooterComponent={<Loader isLoading={isLoading} />}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        maxToRenderPerBatch={FETCH_RESULTS}
        ListEmptyComponent={<Loader isLoading />}
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default BottomLoader;
