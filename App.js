import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomLoader from './screens/BottomLoader';
import TopLoader from './screens/TopLoader';
import TopLoaderRefreshControl from './screens/TopLoaderRefreshControl';
import Combined from './screens/Combined';

const App = () => {
  return (
    <View style={styles.container}>
      <BottomLoader />
      {/* <TopLoader /> */}
      {/* <TopLoaderRefreshControl /> */}
      {/* <Combined /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20,
  },
});
