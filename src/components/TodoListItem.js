import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Checkmark from './Checkmark';
import SwipeableRow from './SwipeableRow';

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
  /**
   * ボタン押下処理
   *
   * @param {number} btnId  ボタンID  0: 削除ボタン
   */
  function btnTapped(btnId) {
    if (btnId == 0) {
      // 削除処理を実行
    }
  }

  return (
    <SwipeableRow onPress={btnTapped}>
      <ListItem topDivider style={{ width: '100%' }}>
        <ListItem.Content style={styles.listItem}>
          <Checkmark complete={true}></Checkmark>
          <ListItem.Title style={styles.listItemTitle}>{`${todoTitle}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </SwipeableRow>
  );
}
