import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './stack/HomeStack';
import { TabContext } from '../contexts/TabContext';

export default function RootNavigation() {
  const [tabReload, setTabReload] = React.useState(false);

  return (
    <TabContext.Provider
      value={{
        tabReload: { get: tabReload, set: setTabReload },
      }}>
      <NavigationContainer>
        <HomeStack></HomeStack>
      </NavigationContainer>
    </TabContext.Provider>
  );
}
