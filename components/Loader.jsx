import { StyleSheet, View, ActivityIndicator } from 'react-native';

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
