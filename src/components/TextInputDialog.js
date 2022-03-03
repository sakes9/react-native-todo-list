import React from 'react';
import { Platform } from 'react-native';
import Dialog from 'react-native-dialog';

/**
 * テキスト入力ダイアログ
 *
 * @export
 * @param {bool}              visible         ダイアログ表示フラグ  true: 表示, false: 非表示
 * @param {string}            defaultValue    デフォルト入力文字（任意）
 * @param {string}            title           タイトル
 * @param {string}            description     サブタイトル
 * @param {string}            placeholder     プレースホルダー（任意）
 * @param {number}            maxLength       入力可能文字数
 * @param {() => void}        cancelCallback  キャンセルボタン押下時の処理
 * @param {(string) => void)} okCallback      OKボタン押下時の処理
 * @return {TextInputDialog}
 */
export default function TextInputDialog({ visible, defaultValue = '', title, description, placeholder = '', maxLength, cancelCallback, okCallback }) {
  const [inputText, setInputText] = React.useState('');
  let textInputRef = React.useRef(null);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    // Android用 フォーカス処理
    if (Platform.OS === 'android') {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 300);
    }
  });

  return (
    <Dialog.Container contentStyle={Platform.OS === 'ios' ? { position: 'absolute', bottom: 0, alignSelf: 'center' } : {}} visible={visible}>
      <Dialog.Title>{`${title}`}</Dialog.Title>
      <Dialog.Description style={{ color: 'black' }}>{`${description}`}</Dialog.Description>
      <Dialog.Input
        maxLength={maxLength}
        textInputRef={textInputRef}
        autoFocus={Platform.OS === 'ios' ? true : false}
        defaultValue={defaultValue}
        placeholder={`${placeholder}`}
        wrapperStyle={{ backgroundColor: 'white' }}
        onLayout={() => {
          setInputText(defaultValue);
          setDisabled(false);
        }}
        onChangeText={(text) => setInputText(text)}
      />
      <Dialog.Button
        disabled={disabled}
        label="Cancel"
        bold={true}
        onPress={() => {
          setDisabled(true);
          cancelCallback();
          setInputText('');
        }}
      />
      <Dialog.Button
        disabled={disabled}
        label="OK"
        onPress={async () => {
          setDisabled(true);
          await okCallback(inputText);
          setInputText('');
        }}
      />
    </Dialog.Container>
  );
}
