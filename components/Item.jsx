import { StyleSheet } from 'react-native';

export const Item = ({ item }) => {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: item?.picture?.large }} style={styles.itemImage} />
      <View style={styles.itemContentWrapper}>
        <Text
          style={styles.itemName}
        >{`${item?.name?.title} ${item?.name?.first} ${item?.name?.last}`}</Text>
        <Text style={styles.itemEmail}>{`${item?.email}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  itemImage: {
    width: 51,
    height: 51,
    marginRight: 15,
  },
  itemContentWrapper: {
    justifyContent: 'space-around',
  },
  itemName: {
    fontSize: 17,
  },
  itemEmail: {
    color: '#777777',
  },
});
