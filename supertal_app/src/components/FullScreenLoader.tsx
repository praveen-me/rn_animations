import {useMiniStore} from '@app/src/lib/MiniStore';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const FullScreenLoader: React.FC = () => {
  const {state} = useMiniStore();

  if (!state.isLoading) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalBackground}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loaderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
});

export default FullScreenLoader;
