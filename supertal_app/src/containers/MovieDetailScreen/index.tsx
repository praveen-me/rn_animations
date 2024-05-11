// src/screens/MovieDetailScreen.tsx
import TopSection from '@app/src/containers/MovieDetailScreen/TopSection';
import useActions from '@app/src/hooks/useActions';
import {useMiniStore} from '@app/src/lib/MiniStore';
import {
  HomeScreenNavigationProp,
  HomeStackParamList,
} from '@app/src/lib/RootNavigator';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

interface IMovieDetailScreenProps {
  route: RouteProp<HomeStackParamList, 'MovieDetail'>;
  navigation: HomeScreenNavigationProp;
}

const MovieDetailScreen: React.FC<IMovieDetailScreenProps> = props => {
  const {route} = props;
  const {state} = useMiniStore();
  const {getAndSetAllMoviesComments, deleteCommentFromMovie} = useActions();

  const {movieId} = route.params;

  useEffect(() => {
    if (movieId) {
      getAndSetAllMoviesComments(movieId);
    }
  }, []);

  const handleDeleteComment = (commentId: number) => {
    if (movieId) {
      deleteCommentFromMovie(commentId, movieId);
    }
  };

  const movie = useMemo(
    () => state.movies.find(m => m.id === movieId),
    [state.movies, movieId],
  );

  const renderHeader = () => movie && <TopSection movie={movie} />;

  const comments = useMemo(() => {
    return movieId ? state.comments[movieId] : [];
  }, [state.comments, movieId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.commentContainer}>
            <Text style={styles.comment}>{item.comment}</Text>
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Continue using previously defined styles and add new ones
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  comment: {
    flex: 1,
  },
});

export default MovieDetailScreen;
