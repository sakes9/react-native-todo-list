import React, { useEffect, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoListItem from '../components/TodoListItem';
import FloatingButton from '../components/FloatingButton';
import { TabView, TabBar } from 'react-native-tab-view';
import TextInputDialog from '../components/TextInputDialog';
import TodoTabService from '../services/TodoTabService';
import TodoTaskService from '../services/TodoTaskService';
import { TabContext } from '../contexts/TabContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Todo1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Todo2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Todo3',
  },
];

let selectedTabKey = '';
let selectedEditTaskId = '';
let selectedEditTaskName = '';

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);

  const [tabList, setTabList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);

  const [visibleAddTodoAlert, setVisibleAddTodoAlert] = React.useState(false);
  const [visibleEditTodoAlert, setVisibleEditTodoAlert] = React.useState(false);

  const { tabReload } = React.useContext(TabContext);

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

  useEffect(() => {
    (async function () {
      try {
        // タブ取得
        const todoTabService = new TodoTabService();
        const storageTabList = await todoTabService.getTabList();
        setTabList(storageTabList);

        // タスク取得
        const todoTaskService = new TodoTaskService();
        const storageTaskList = await todoTaskService.getTaskList();
        setTaskList(storageTaskList);

        selectedTabKey = storageTabList.length ? storageTabList[0].key : '';
      } catch (e) {
        setTabList([]);
        setTaskList([]);
        selectedTabKey = '';
      }
    })();
  }, []);

  // タブ更新時に実行
  useEffect(() => {
    if (tabReload.get) {
      (async function () {
        try {
          const todoTabService = new TodoTabService();
          const storageTabList = await todoTabService.getTabList();

          setTabList(storageTabList);
        } catch (e) {
          setTabList([]);
        } finally {
          tabReload.set(false);
        }
      })();
    }
  }, [tabReload]);

  // タブ一覧更新時に実行
  useEffect(() => {
    const tabListRoutes = tabList.map((tabObj) => {
      return {
        key: tabObj.key,
        title: tabObj.name,
      };
    });

    setRoutes(tabListRoutes);

    // タブ更新前に選択されていたタブを選択する
    const selectedTabIndex = tabList.findIndex((tabObj) => tabObj.key == selectedTabKey);
    0 <= selectedTabIndex ? setIndex(selectedTabIndex) : setIndex(0);
  }, [tabList]);

  /**
   * タスク編集ダイアログ表示処理
   *
   * @param {string} editTaskId   編集するタスクのID
   * @param {string} editTaskName 編集するタスクのタスク名
   */
  function showEditTaskAlert(editTaskId, editTaskName) {
    selectedEditTaskId = editTaskId;
    selectedEditTaskName = editTaskName;

    setVisibleEditTodoAlert(true);
  }

  /**
   * タスク追加処理
   *
   * @param {string} taskName  追加するタスク名
   */
  async function addTask(taskName) {
    try {
      const todoTaskService = new TodoTaskService();
      await todoTaskService.addTask(selectedTabKey, taskName);

      const storageTaskList = await todoTaskService.getTaskList();
      setTaskList(storageTaskList);
    } catch (e) {
      Alert.alert('エラー', 'Todoの追加に失敗しました', [{ text: 'OK' }]);
    }
  }

  /**
   * タスク編集処理
   *
   * @param {string} taskName  編集後のタスク名
   */
  async function editTask(taskName) {
    try {
      const todoTaskService = new TodoTaskService();
      await todoTaskService.editTask(selectedEditTaskId, taskName);

      const storageTaskList = await todoTaskService.getTaskList();
      setTaskList(storageTaskList);
    } catch (e) {
      Alert.alert('エラー', 'Todoの編集に失敗しました', [{ text: 'OK' }]);
    }

    selectedEditTaskId = '';
    selectedEditTaskName = '';
  }

  /**
   * タスク削除処理
   *
   * @param {string} taskId 削除するタスクのId
   */
  async function deleteTask(taskId) {
    try {
      const todoTaskService = new TodoTaskService();
      await todoTaskService.deleteTask(taskId);

      const storageTaskList = await todoTaskService.getTaskList();
      setTaskList(storageTaskList);
    } catch (e) {
      Alert.alert('エラー', 'Todoの削除に失敗しました', [{ text: 'OK' }]);
    }
  }

  const renderItem = ({ item }) => {
    return <TodoListItem taskId={item.id} todoTitle={item.name} listItemTapped={showEditTaskAlert} deleteBtnTapped={deleteTask}></TodoListItem>;
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      default:
        const filterTaskList = taskList.filter((taskObj) => taskObj.key == route.key);
        return <FlatList data={filterTaskList} renderItem={renderItem} keyExtractor={(item) => item.id} />;
    }
  };

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        activeColor={'#167476'}
        inactiveColor={'#505050'}
        style={{ backgroundColor: 'white' }}
        tabStyle={{ width: 'auto', minWidth: 100 }}
        labelStyle={{ color: 'black', fontWeight: 'bold' }}
        indicatorStyle={{ borderBottomWidth: 2, borderColor: '#6B7076' }}
        scrollEnabled={true}
        pressOpacity={1}></TabBar>
    );
  };

  return (
    <View style={styles.container}>
      {0 < routes.length && (
        <>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(index) => {
              selectedTabKey = tabList[index].key;
              setIndex(index);
            }}
            initialLayout={{ width: layout.width }}
          />

          <FloatingButton onPress={() => setVisibleAddTodoAlert(true)}></FloatingButton>

          <TextInputDialog
            visible={visibleAddTodoAlert}
            title={'Todo追加'}
            description={'追加するTodo名を入力してください'}
            placeholder={'50文字以内'}
            maxLength={50}
            cancelCallback={() => setVisibleAddTodoAlert(false)}
            okCallback={async (text) => {
              await addTask(text);
              setVisibleAddTodoAlert(false);
            }}></TextInputDialog>

          <TextInputDialog
            visible={visibleEditTodoAlert}
            defaultValue={selectedEditTaskName}
            title={'Todo編集'}
            description={'編集するTodo名を入力してください'}
            placeholder={'50文字以内'}
            maxLength={50}
            cancelCallback={() => setVisibleEditTodoAlert(false)}
            okCallback={async (text) => {
              await editTask(text);
              setVisibleEditTodoAlert(false);
            }}></TextInputDialog>
        </>
      )}

      <StatusBar style="light" />
    </View>
  );
}
