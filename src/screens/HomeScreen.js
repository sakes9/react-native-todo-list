import React, { useEffect, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoListItem from '../components/TodoListItem';
import FloatingButton from '../components/FloatingButton';
import { TabView, TabBar } from 'react-native-tab-view';
import TextInputDialog from '../components/TextInputDialog';
import TodoTabService from '../services/TodoTabService';
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

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);

  const [tabList, setTabList] = React.useState([]);

  const [visibleAddTodoAlert, setVisibleAddTodoAlert] = React.useState(false);

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
        const todoTabService = new TodoTabService();
        const storageTabList = await todoTabService.getTabList();

        setTabList(storageTabList);
      } catch (e) {
        setTabList([]);
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
  }, [tabList]);

  const renderItem = ({ item }) => {
    return <TodoListItem todoTitle={item.title}></TodoListItem>;
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      default:
        return <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />;
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
            onIndexChange={setIndex}
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
            okCallback={() => setVisibleAddTodoAlert(false)}></TextInputDialog>
        </>
      )}

      <StatusBar style="light" />
    </View>
  );
}
