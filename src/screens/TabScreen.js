import { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabListItem from '../components/TabListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'タブ1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'タブ2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'タブ3',
  },
];

export default function TabScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Icon name="plus" color={'white'} size={25}></Icon>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const renderItem = ({ item }) => {
    return <TabListItem tabTitle={item.title}></TabListItem>;
  };

  return (
    <View style={styles.container}>
      <FlatList contentContainerStyle={{ marginTop: 30 }} data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />

      <StatusBar style="light" />
    </View>
  );
}
