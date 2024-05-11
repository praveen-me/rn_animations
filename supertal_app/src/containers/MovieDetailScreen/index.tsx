// src/screens/MovieDetailScreen.tsx
import {useMiniStore} from '@app/src/lib/MiniStore';
import {
  HomeScreenNavigationProp,
  HomeStackParamList,
} from '@app/src/lib/RootNavigator';
import {RouteProp} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Comment {
  id: number;
  userId: number; // Assuming a user ID for the comment
  comment: string;
}

const initialComments: Comment[] = [
  {id: 1, userId: 101, comment: 'Incredible movie, loved the special effects!'},
  {id: 2, userId: 102, comment: 'Was expecting more action, but still good.'},
];

interface IMovieDetailScreenProps {
  route: RouteProp<HomeStackParamList, 'MovieDetail'>;
  navigation: HomeScreenNavigationProp;
}

const MovieDetailScreen: React.FC<IMovieDetailScreenProps> = props => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const {route} = props;

  const {state} = useMiniStore();

  const handleAddComment = () => {
    const newCommentObj = {
      id: Date.now(), // Simple unique ID generation
      userId: 999, // Example user ID
      comment: newComment,
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const renderHeader = () => (
    <>
      {movie && (
        <>
          <FastImage
            style={styles.image}
            source={{uri: movie.poster}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.title}>{movie.name}</Text>
          <Text style={styles.description}>{movie.description}</Text>
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Add Comment" onPress={handleAddComment} />
    </>
  );

  const movie = useMemo(
    () => state.movies.find(m => m.id === route.params?.movieId),
    [state.movies, route.params?.movieId],
  );

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
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
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
