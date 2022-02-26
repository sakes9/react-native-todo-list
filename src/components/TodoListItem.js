import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Checkmark from './Checkmark';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItemTitle: {
    flex: 1,
    marginLeft: 10,
  },
});

/**
 * Todoリストアイテム
 *
 * @export
 * @param {string} todoTitle Todoタイトル
 * @return {TodoListItem}
 */
export default function TodoListItem({ todoTitle }) {
  return (
    <ListItem topDivider style={{ width: '100%' }}>
      <ListItem.Content style={styles.listItem}>
        <Checkmark complete={true}></Checkmark>
        <ListItem.Title style={styles.listItemTitle}>{`${todoTitle}`}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
