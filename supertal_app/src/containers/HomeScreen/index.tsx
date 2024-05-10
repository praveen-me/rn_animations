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
import {useMiniStore} from '@app/src/lib/MiniStore';
import {IMovie} from '@app/src/@types/common';
import Icon from 'react-native-vector-icons/FontAwesome5';

// import {useNavigation} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const {state} = useMiniStore();
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({item}: {item: IMovie}) => {
    // const isFavorite = favorites.includes(item.id); // Assuming 'favorites' is part of your state
    const handlePressFavorite = () => {
      // if (isFavorite) {
      //   dispatch({type: 'REMOVE_FROM_FAVORITES', payload: item.id});
      // } else {
      //   dispatch({type: 'ADD_TO_FAVORITES', payload: item.id});
      // }
    };

    return (
      <View style={styles.movieItem}>
        <TouchableOpacity onPress={() => {}} style={styles.movieContent}>
          <FastImage
            style={styles.image}
            source={{
              uri: item.poster,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.movieName}>{item.name}</Text>
          <TouchableOpacity
            onPress={handlePressFavorite}
            style={styles.favoriteButton}>
            <Icon name={'heart'} size={24} color={'red'} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={state.movies}
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

export default HomeScreen;
