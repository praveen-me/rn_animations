// src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
// import {useNavigation} from '@react-navigation/native';

interface Movie {
  id: number;
  name: string;
  thumbnailUrl: string;
}

const movies: Movie[] = [
  {
    id: 1,
    name: 'Inception',
    thumbnailUrl: 'https://example.com/inception.jpg',
  },
  {
    id: 2,
    name: 'Interstellar',
    thumbnailUrl: 'https://example.com/interstellar.jpg',
  },
];

const HomeScreen: React.FC = () => {
  // const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => {
        // navigation.navigate('MovieDetailScreen', {movieId: item.id})
      }}>
      <FastImage
        style={styles.image}
        source={{
          uri: item.thumbnailUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.movieName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
});

export default HomeScreen;
