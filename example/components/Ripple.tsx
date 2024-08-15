import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Ripple } from '@rnmu/components';

const RippleExample = () => {
  return (
    <View style={styles.container}>
      <Ripple
        onPress={() => {}}
        rippleColor="rgba(0, 0, 0, .32)"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 20 }}>Press anywhere</Text>
      </Ripple>
    </View>
  );
};

RippleExample.title = 'Ripple';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RippleExample;
