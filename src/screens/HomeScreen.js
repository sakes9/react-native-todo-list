import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkmark from '../components/Checkmark';
import TodoListItem from '../components/TodoListItem';
import FloatingButton from '../components/FloatingButton';
import AlertUtil from '../utils/AlertUtil';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const renderScene = SceneMap({
  tab1: FirstRoute,
  tab2: SecondRoute,
  tab3: FirstRoute,
  tab4: SecondRoute,
  tab5: FirstRoute,
});

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tab1', title: 'タブ1' },
    { key: 'tab2', title: 'タブ2' },
    { key: 'tab3', title: 'タブ3' },
    { key: 'tab4', title: 'タブ4' },
    { key: 'tab5', title: 'タブ5' },
  ]);

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
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      {/* <View style={{ width: '100%' }}>
        <TodoListItem todoTitle={'てすとTodo'}></TodoListItem>
      </View> */}

      <FloatingButton onPress={showAddTodoAlert}></FloatingButton>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
