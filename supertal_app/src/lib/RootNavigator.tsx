import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '@app/src/containers/HomeScreen';
import FavoritesScreen from '@app/src/containers/FavoritesScreen';
import MovieDetailScreen from '@app/src/containers/MovieDetailScreen';
import {useMiniStore} from '@app/src/lib/MiniStore';
import useActions from '@app/src/hooks/useActions';

export type HomeStackParamList = {
  HomeScreen: undefined;
  MovieDetail: {movieId: number};
};

export type FavouriteStackParamList = {
  Favorites: undefined;
  MovieDetail: {movieId: number};
};

export type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

const Tab = createBottomTabNavigator();
const HomeScreenStack = createStackNavigator<HomeStackParamList>();
const FavouriteScreenStack = createStackNavigator<FavouriteStackParamList>();

interface ITabBarIconProps {
  route: any;
  focused: boolean;
  color: string;
  size: number;
}

function TabBarIcon({route, focused, color, size}: ITabBarIconProps) {
  let iconName:
    | 'home'
    | 'home-outline'
    | 'favorite'
    | 'favorite-border'
    | 'heart' = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Favorites') {
    iconName = focused ? 'heart' : 'heart';
  }

  return <Icon name={iconName} size={size} color={color} />;
}

function HomeStack() {
  return (
    <HomeScreenStack.Navigator screenOptions={{headerShown: false}}>
      <HomeScreenStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeScreenStack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
      />
    </HomeScreenStack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <FavouriteScreenStack.Navigator screenOptions={{headerShown: false}}>
      <FavouriteScreenStack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
      <FavouriteScreenStack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
      />
    </FavouriteScreenStack.Navigator>
  );
}

function RootNavigator(): JSX.Element {
  const {state} = useMiniStore();
  const {getAndSetAllMovies} = useActions();

  useEffect(() => {
    getAndSetAllMovies();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => (
            <TabBarIcon
              route={route}
              focused={focused}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Favorites" component={FavoritesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
