import React, { useEffect, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabListItem from '../components/TabListItem';
import TextInputDialog from '../components/TextInputDialog';
import TodoTabService from '../services/TodoTabService';
import { TabContext } from '../contexts/TabContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});

export default function TabScreen({ navigation }) {
  const [tabList, setTabList] = React.useState([]);
  const [visibleAddTabAlert, setVisibleAddTabAlert] = React.useState(false);

  const { tabReload } = React.useContext(TabContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => setVisibleAddTabAlert(true)}>
            <Icon name="plus" color={'white'} size={25}></Icon>
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

  /**
   * タブ追加処理
   *
   * @param {string} tabName  追加するタブ名
   */
  async function addTab(tabName) {
    try {
      const todoTabService = new TodoTabService();
      await todoTabService.addTab(tabName);

      const storageTabList = await todoTabService.getTabList();
      setTabList(storageTabList);

      tabReload.set(true);
    } catch (e) {
      Alert.alert('エラー', 'タブの追加に失敗しました', [{ text: 'OK' }]);
    }
  }

  const renderItem = ({ item }) => {
    return <TabListItem tabTitle={item.name}></TabListItem>;
  };

  return (
    <View style={styles.container}>
      <FlatList contentContainerStyle={{ marginTop: 30 }} data={tabList} renderItem={renderItem} keyExtractor={(item) => item.key} />

      <TextInputDialog
        visible={visibleAddTabAlert}
        title={'タブ追加'}
        description={'追加するタブ名を入力してください'}
        placeholder={'20文字以内'}
        maxLength={20}
        cancelCallback={() => setVisibleAddTabAlert(false)}
        okCallback={async (text) => {
          await addTab(text);
          setVisibleAddTabAlert(false);
        }}></TextInputDialog>

      <StatusBar style="light" />
    </View>
  );
}
