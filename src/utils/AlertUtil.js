import { Alert } from 'react-native';

export default class AlertUtil {
  /**
   * テキスト入力アラート
   *
   * @static
   * @param {string} title              タイトル
   * @param {string} message            メッセージ
   * @param {(string) => void} onPress  OKボタン押下時の処理
   * @memberof AlertUtil
   */
  static showTextInputAlert(title, message, onPress) {
    Alert.prompt(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: (text) => onPress(text) },
    ]);
  }
}
