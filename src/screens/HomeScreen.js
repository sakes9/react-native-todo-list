import { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkmark from '../components/Checkmark';
import TodoListItem from '../components/TodoListItem';
import FloatingButton from '../components/FloatingButton';
import AlertUtil from '../utils/AlertUtil';

export default function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Tab')}>
            <Icon name="folder" color={'white'} size={25}></Icon>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  /**
   * Todo追加アラートを表示する
   *
   */
  function showAddTodoAlert() {
    AlertUtil.showTextInputAlert('Todo追加', '追加するTodo名を入力してください', (text) => console.log(text));
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <TodoListItem todoTitle={'てすとTodo'}></TodoListItem>
      </View>

      <FloatingButton onPress={showAddTodoAlert}></FloatingButton>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
