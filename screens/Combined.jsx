import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FETCH_RESULTS, useFetchUser } from '../hooks/useFetchUser';
import { Item } from '../components/Item';
import { Loader } from '../components/Loader';

const Combined = () => {
  const flatListRef = useRef(null);

  const {
    isLoading: isLoadingTop,
    success: successTop,
    users: usersTop,
    errorMessage: errorMessageTop,
    getUsers: getUsersTop,
  } = useFetchUser();

  const {
    isLoading: isLoadingBottom,
    success: successBottom,
    users: usersBottom,
    errorMessage: errorMessageBottom,
    getUsers: getUsersBottom,
  } = useFetchUser();

  const [combinedUsers, setConfirmedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const loadMoreItem = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsTop(true);
    loadMoreItem();
  }, []);

  const scrollToItem = (index) => {
    flatListRef.current.scrollToIndex({ index: index, animated: false });
  };

  useEffect(() => {
    getUsersTop(currentPage, isTop);
  }, [currentPage]);

  useEffect(() => {
    if (successTop) {
      setRefreshing(false);
      setConfirmedUsers(usersTop);

      if (combinedUsers.length > 0) {
        scrollToItem(FETCH_RESULTS - 1);
      }
    }
  }, [successTop]);

  useEffect(() => {
    if (successBottom) {
      setConfirmedUsers(usersBottom);
    }
  }, [successBottom]);

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
        Combined Bidirectional FlatList
      </Text>
      {errorMessageTop ? <Text>{errorMessageTop}</Text> : null}
      <FlatList
        ref={flatListRef}
        data={combinedUsers}
        renderItem={Item}
        keyExtractor={(item) => item?.email}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // tintColor='red'
            // colors={['red', 'green', 'blue']}
            // progressBackgroundColor={'green'}
            // title='Loading users...'
            // titleColor='green'
            // size={'large'}
            // progressViewOffset={200}

            // tintColor='transparent'
            // colors={['transparent']}
            // style={{ backgroundColor: 'transparent' }}
          />
        }
        maxToRenderPerBatch={FETCH_RESULTS}
        // ListHeaderComponent={<Loader isLoading={refreshing} withText={true} />}
        ListFooterComponent={<Loader isLoading={isLoadingBottom} />}
        onEndReached={() => {
          loadMoreItem();
          setIsTop(false);
        }}
        onEndReachedThreshold={0}
        ListEmptyComponent={<Loader isLoading />}
        initialScrollIndex={0}
        // Layout doesn't know the exact location of the requested element.
        // Falling back to calculating the destination manually
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          flatListRef.current?.scrollToOffset({
            offset: index * averageItemLength,
            animated: true,
          });
        }}
      />

      {errorMessageBottom ? <Text>{errorMessageBottom}</Text> : null}
    </View>
  );
};

export default Combined;

const styles = StyleSheet.create({});
