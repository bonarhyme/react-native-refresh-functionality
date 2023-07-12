import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

export const Loader = ({ isLoading = false, withText = false }) => {
  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size='large' color='#aaaaaa' />
      {withText ? (
        <Text style={{ color: 'green' }}>Loading users...</Text>
      ) : null}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 15,
    alignItems: 'center',
  },
});
