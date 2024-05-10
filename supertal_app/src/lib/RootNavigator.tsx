import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '@app/src/containers/HomeScreen';
import FavoritesScreen from '@app/src/containers/FavoritesScreen';
import {useMiniStore} from '@app/src/lib/MiniStore';
import useActions from '@app/src/hooks/useActions';

const Tab = createBottomTabNavigator();

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

function RootNavigator(): JSX.Element {
  const {state} = useMiniStore();
  const {getAndSetAllMovies} = useActions();

  useEffect(() => {
    getAndSetAllMovies();
  }, []);

  console.log({state});

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
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
