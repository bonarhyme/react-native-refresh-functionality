import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FETCH_RESULTS, useFetchUser } from '../hooks/useFetchUser';
import { Item } from '../components/Item';
import { Loader } from '../components/Loader';

const TopLoader = () => {
  const flatListRef = useRef(null);

  const { isLoading, success, users, errorMessage, getUsers } = useFetchUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const loadMoreItem = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadMoreItem();
  }, []);

  const scrollToItem = (index) => {
    flatListRef.current.scrollToIndex({ index: index, animated: false });
  };

  useEffect(() => {
    if (success) {
      setRefreshing(false);
      scrollToItem(FETCH_RESULTS - 1);
    }
  }, [success]);

  useEffect(() => {
    getUsers(currentPage, true);
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
        Pull To Refresh Control
      </Text>

      <FlatList
        ref={flatListRef}
        data={users}
        renderItem={Item}
        keyExtractor={(item) => item?.email}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor='red'
            colors={['red', 'green', 'blue']}
          />
        }
        maxToRenderPerBatch={FETCH_RESULTS}
        ListEmptyComponent={<Loader isLoading />}
        // Layout doesn't know the exact location of the requested element.
        // Falling back to calculating the destination manually
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          flatListRef.current?.scrollToOffset({
            offset: index * averageItemLength,
            animated: true,
          });
        }}
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default memo(TopLoader);

const styles = StyleSheet.create({});
