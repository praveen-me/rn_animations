/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import RootNavigator from '@app/src/lib/RootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HomeScreen />
      </ScrollView> */}
      <RootNavigator />
    </SafeAreaView>
  );
}

export default App;
