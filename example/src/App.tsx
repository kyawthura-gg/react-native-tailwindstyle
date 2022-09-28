import * as React from 'react';

import { StyleSheet, Text } from 'react-native';
import { View } from '../../src';

export default function App() {
  return (
    <View pt-20 px-10>
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
