import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {useMiniStore} from '@app/src/lib/MiniStore';
import {IMovie} from '@app/src/@types/common';

import MovieItem from '@app/src/components/MovieItem';

// import {useNavigation} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const {state} = useMiniStore();
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({item}: {item: IMovie}) => {
    return <MovieItem movie={item} />;
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={state.movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: screenWidth * 0.025}}
        estimatedItemSize={150} // Adjust based on your average item height
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // A light grey background
  },
});

export default HomeScreen;
