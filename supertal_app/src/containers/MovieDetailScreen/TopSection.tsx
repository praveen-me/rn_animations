import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {IMovie} from '@app/src/@types/common';
import FastImage from 'react-native-fast-image';
import useActions from '@app/src/hooks/useActions';

interface ITopSectionProps {
  movie: IMovie;
}

export default function TopSection({movie}: ITopSectionProps) {
  const [newComment, setNewComment] = useState('');
  const {addCommentToMovie} = useActions();

  const handleAddComment = () => {
    if (newComment) {
      addCommentToMovie(newComment, movie.id);
    }
  };

  return (
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Add Comment" onPress={handleAddComment} />
      </KeyboardAvoidingView>
    </>
  );
}

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
});
