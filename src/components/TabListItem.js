import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItemTitle: {
    flex: 1,
  },
});

/**
 * タブリストアイテム
 *
 * @export
 * @param {string} tabTitle タブタイトル
 * @return {TabListItem}
 */
export default function TabListItem({ tabTitle }) {
  return (
    <ListItem topDivider style={{ width: '100%' }}>
      <ListItem.Content style={styles.listItem}>
        <ListItem.Title style={styles.listItemTitle}>{`${tabTitle}`}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
