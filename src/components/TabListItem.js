import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/themed';
import SwipeableRow from './SwipeableRow';

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
 * @param {string} tabKey   タブキー
 * @param {string} tabTitle タブタイトル
 * @param {(tabKey: string, tabTitle: string) => void)} listItemTapped リストタップ時の処理
 * @param {(tabKey: string) => void)} deleteBtnTapped 削除ボタン押下時の処理
 * @return {TabListItem}
 */
export default function TabListItem({ tabKey, tabTitle, listItemTapped, deleteBtnTapped }) {
  /**
   * ボタン押下処理
   *
   * @param {number} btnId  ボタンID  0: 削除ボタン
   */
  function btnTapped(btnId) {
    if (btnId == 0) {
      // 削除処理を実行
      deleteBtnTapped(tabKey);
    }
  }

  return (
    <SwipeableRow onPress={btnTapped}>
      <TouchableOpacity onPress={() => listItemTapped(tabKey, tabTitle)} activeOpacity={1}>
        <ListItem topDivider style={{ width: '100%' }}>
          <ListItem.Content style={styles.listItem}>
            <ListItem.Title style={styles.listItemTitle}>{`${tabTitle}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </SwipeableRow>
  );
}
