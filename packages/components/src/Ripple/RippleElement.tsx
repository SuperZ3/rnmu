import { Animated, StyleSheet } from 'react-native';
import { RippleElementProps } from './ripple.type';
import { RippleElementTestId } from './utils';

const RippleElement: React.FC<RippleElementProps> = props => {
  const {
    rippleConfig: { emitedX, emitedY, rippleAnim, R },
    rippleOpacity,
    isForeground,
    rippleColor,
  } = props;

  return (
    <Animated.View
      testID={RippleElementTestId}
      style={[
        styles.rippleElement,
        {
          top: emitedY - R,
          left: emitedX - R,
          width: 2 * R,
          height: 2 * R,
          borderRadius: R,
          backgroundColor: rippleColor,
          opacity: rippleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, rippleOpacity],
          }),
          transform: [{ scale: rippleAnim }, { perspective: 1000 }],
          zIndex: isForeground ? -1 : 0,
        },
      ]}
      pointerEvents={'none'}
    ></Animated.View>
  );
};

export default RippleElement;

export const styles = StyleSheet.create({
  rippleElement: {
    position: 'absolute',
    pointerEvents: 'none',
  },
});
