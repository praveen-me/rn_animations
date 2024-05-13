import {View, Dimensions, StyleSheet, Text} from 'react-native';
import React, {useMemo} from 'react';
import MovieItem from '@app/src/components/MovieItem';
import {IMovie} from '@app/src/@types/common';
import {useMiniStore} from '@app/src/lib/MiniStore';
import {FlashList} from '@shopify/flash-list';

const screenWidth = Dimensions.get('window').width;

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No movies found</Text>
    </View>
  );
};

export default function FavoritesScreen() {
  const {state} = useMiniStore();

  const movies = useMemo<IMovie[]>(() => {
    return state.favouriteMovies
      .map(movieId => state.movies.find(movie => movie?.id === movieId))
      .filter(movie => movie !== undefined) as IMovie[];
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
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // A light grey background
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 35,
  },
});
