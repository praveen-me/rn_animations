/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import RootNavigator from '@app/src/lib/RootNavigator';
import {MiniStore} from '@app/src/lib/MiniStore';

function App(): React.JSX.Element {
  return (
    <MiniStore>
      <SafeAreaView style={{flex: 1}}>
        {/* <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <HomeScreen />
      </ScrollView> */}
        <RootNavigator />
      </SafeAreaView>
    </MiniStore>
  );
}

export default App;
