import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Ripple } from '@rnmu/components';

const RippleExample = () => {
  return (
    <Ripple
      style={styles.ripple}
      onPress={() => {}}
      rippleColor="rgba(0, 0, 0, .32)">
      <View pointerEvents="none">
        <Text>Press anywhere</Text>
      </View>
    </Ripple>
  );
};

RippleExample.title = 'Ripple';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ripple: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RippleExample;
