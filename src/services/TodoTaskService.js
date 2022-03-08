import AsyncStorage from '@react-native-async-storage/async-storage';

export default class TodoTaskService {
  /**
   * TodoタスクのIDを作成する
   *
   * @return {string} タスクID
   * @memberof TodoTaskService
   */
  createTaskId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < 20; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }

  /**
   * Todoタスクを追加する
   *
   * @param {string} tabKey    タブキー
   * @param {string} taskName  タスク名
   * @memberof TodoTaskService
   */
  async addTask(tabKey, taskName) {
    const addTaskObj = {
      id: this.createTaskId(),
      key: tabKey,
      name: taskName,
      complete: false,
      date: new Date(),
    };

    try {
      let taskList = await this.getTaskList();
      taskList.push(addTaskObj);
      await AsyncStorage.setItem('@taskKey', JSON.stringify(taskList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * タスク一覧を取得
   *
   * @return {Promise<[string]>} タスク一覧（ストレージにタスク情報が存在しない場合は、空配列を返す）
   * @memberof TodoTaskService
   */
  async getTaskList() {
    try {
      const jsonValue = await AsyncStorage.getItem('@taskKey');
      const jsonParse = jsonValue ? JSON.parse(jsonValue) : [];

      return jsonParse;
    } catch (e) {
      throw e;
    }
  }
}
