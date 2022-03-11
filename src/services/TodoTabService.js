import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoTaskService from './TodoTaskService';

export default class TodoTabService {
  TAB_KEY = '@tabKey';

  /**
   * Todoタブのキーを作成する
   *
   * @return {string} タブキー
   * @memberof TodoTabService
   */
  createTabKey() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < 20; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }

  /**
   * Todoタブを追加する
   *
   * @param {string} tabName  タブ名
   * @param {string} tabKey   タブキー（任意）
   * @memberof TodoTabService
   */
  async addTab(tabName, tabKey = null) {
    const addTabObj = {
      key: tabKey ? tabKey : this.createTabKey(),
      name: tabName,
      date: new Date(),
    };

    try {
      let tabList = await this.getTabList();
      tabList.push(addTabObj);
      await AsyncStorage.setItem(this.TAB_KEY, JSON.stringify(tabList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todoタブを編集する
   *
   * @param {string} editTabKey   編集するタブのキー
   * @param {string} editTabName  編集するタブのタブ名
   * @memberof TodoTabService
   */
  async editTab(editTabKey, editTabName) {
    try {
      const tabList = await this.getTabList();
      const editTabObj = tabList.filter((tabObj) => tabObj.key == editTabKey)[0];
      editTabObj.name = editTabName;
      const updateTabList = tabList.map((tabObj) => (tabObj.key == editTabKey ? editTabObj : tabObj));

      await AsyncStorage.setItem(this.TAB_KEY, JSON.stringify(updateTabList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todoタブを削除する
   *
   * @param {string} tabKey 削除するタブのキー
   * @memberof TodoTabService
   */
  async deleteTab(tabKey) {
    try {
      // タブを削除
      const tabList = await this.getTabList();
      const updateTabList = tabList.filter((tabObj) => tabObj.key != tabKey);
      await AsyncStorage.setItem(this.TAB_KEY, JSON.stringify(updateTabList));

      // タブに紐づくタスクを削除
      const todoTaskService = new TodoTaskService();
      await todoTaskService.deleteTaskTargetTabKey(tabKey);
    } catch (e) {
      throw e;
    }
  }

  /**
   * タブ一覧を取得
   *
   * @return {Promise<[string]>} タブ一覧（ストレージにタブ情報が存在しない場合は、空配列を返す）
   * @memberof TodoTabService
   */
  async getTabList() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.TAB_KEY);
      const jsonParse = jsonValue ? JSON.parse(jsonValue) : [];

      return jsonParse;
    } catch (e) {
      throw e;
    }
  }
}
