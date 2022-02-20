import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TabScreen from './src/screens/TabScreen';
import RootNavigation from './src/navigations/RootNavigation';

export default function App() {
  return <RootNavigation></RootNavigation>;
}
