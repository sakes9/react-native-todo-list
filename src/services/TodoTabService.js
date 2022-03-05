import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TodoTabService {
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
   * @memberof TodoTabService
   */
  async addTab(tabName) {
    const addTabObj = {
      key: this.createTabKey(),
      name: tabName,
      date: new Date(),
    };

    try {
      let tabList = await this.getTabList();
      tabList.push(addTabObj);
      await AsyncStorage.setItem('@tabKey', JSON.stringify(tabList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todo一覧を取得
   *
   * @return {Promise<[string]>} タブ一覧（ストレージにタブ情報が存在しない場合は、空配列を返す）
   * @memberof TodoTabService
   */
  async getTabList() {
    try {
      const jsonValue = await AsyncStorage.getItem('@tabKey');
      const jsonParse = jsonValue ? JSON.parse(jsonValue) : [];

      return jsonParse;
    } catch (e) {
      throw e;
    }
  }
}
