import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import MovieItem from '@app/src/components/MovieItem';
import {IMovie} from '@app/src/@types/common';
import {useMiniStore} from '@app/src/lib/MiniStore';
import {FlashList} from '@shopify/flash-list';

const screenWidth = Dimensions.get('window').width;
export default function FavoritesScreen() {
  const {state} = useMiniStore();

  const movies = useMemo(() => {
    return state.favouriteMovies.map(movieId =>
      state.movies.find(movie => movie.id === movieId),
    );
  }, [state.movies, state.favouriteMovies]);

  const renderItem = ({item}: {item: IMovie}) => {
    return <MovieItem movie={item} />;
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: screenWidth * 0.025}}
        estimatedItemSize={150} // Adjust based on your average item height
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // A light grey background
  },
});
