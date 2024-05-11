import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {IMovie} from '@app/src/@types/common';
import Icon from 'react-native-vector-icons/Ionicons';
import useActions from '@app/src/hooks/useActions';
import {useMiniStore} from '@app/src/lib/MiniStore';
import {useNavigation} from '@react-navigation/native';

interface IMovieProps {
  movie: IMovie;
}

export default function MovieItem({movie}: IMovieProps) {
  const {toggleMovieFromFavorites} = useActions();
  const {state} = useMiniStore();
  const navigation = useNavigation();

  const handlePressFavorite = () => {
    toggleMovieFromFavorites(movie.id);
  };

  const isFavouriteMovie = useMemo(
    () =>
      state.favouriteMovies.findIndex(movieId => movieId === movie.id) !== -1,
    [state.favouriteMovies, movie.id],
  );

  return (
    <View style={styles.movieItem}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MovieDetail', {movieId: movie.id});
        }}
        style={styles.movieContent}>
        <FastImage
          style={styles.image}
          source={{
            uri: movie.poster,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.movieName}>{movie.name}</Text>
        <TouchableOpacity
          onPress={handlePressFavorite}
          style={styles.favoriteButton}>
          <Icon
            name={isFavouriteMovie ? 'heart' : 'heart-outline'}
            size={24}
            color={'red'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // A light grey background
  },
  movieItem: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff', // White background for each item
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 220,
  },
  movieName: {
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Dark grey text for better readability
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  favoriteButton: {
    padding: 10,
    alignItems: 'center',
  },
  movieContent: {
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 1,
  },
});
