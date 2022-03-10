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
 * @param {string} taskId    TodoタスクID
 * @param {string} todoTitle Todoタイトル
 * @param {(taskId: string, todoTitle: string) => void)} listItemTapped リストタップ時の処理
 * @param {(taskId: string) => void)} deleteBtnTapped 削除ボタン押下時の処理
 * @return {TodoListItem}
 */
export default function TodoListItem({ taskId, todoTitle, listItemTapped, deleteBtnTapped }) {
  /**
   * ボタン押下処理
   *
   * @param {number} btnId  ボタンID  0: 削除ボタン
   */
  function btnTapped(btnId) {
    if (btnId == 0) {
      // 削除処理を実行
      deleteBtnTapped(taskId);
    }
  }

  return (
    <SwipeableRow onPress={btnTapped}>
      <TouchableOpacity onPress={() => listItemTapped(taskId, todoTitle)} activeOpacity={1}>
        <ListItem topDivider style={{ width: '100%' }}>
          <ListItem.Content style={styles.listItem}>
            <Checkmark complete={true}></Checkmark>
            <ListItem.Title style={styles.listItemTitle}>{`${todoTitle}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </SwipeableRow>
  );
}
