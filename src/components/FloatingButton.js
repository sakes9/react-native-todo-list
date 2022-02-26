import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 30,
    bottom: 60,
    width: 60,
    height: 60,
    backgroundColor: '#167476',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

/**
 * フローティングボタン
 *
 * @export
 * @param {() => void} onPress ボタン押下時の処理
 * @return {FloatingButton}
 */
export default function FloatingButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="plus" size={25} color={'white'}></Icon>
    </TouchableOpacity>
  );
}
