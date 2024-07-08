import { useEffect, useRef, FC } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';

const ActivityIndicator: FC<any> = () => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
      style={{
        width: 50,
        height: 100,
        overflow: 'hidden',
        backgroundColor: 'red',
      }}
      >
        <Animated.View
          style={{
            width: 100,
            height: 50,
            overflow: 'hidden',
            backgroundColor: 'red',
          }}>
          <Animated.View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 5,
              borderColor: 'blue',
            }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  origin: {},
});

export default ActivityIndicator;
