import { StyleSheet } from 'react-native/types';

export const Loader = ({ isLoading = false }) => {
  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size='large' color='#aaaaaa' />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 15,
    alignItems: 'center',
  },
});
