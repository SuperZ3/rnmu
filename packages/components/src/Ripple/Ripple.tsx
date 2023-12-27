import { useState } from 'react';
import {
  Animated,
  ColorValue,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';

export interface RippleProps extends PressableProps {
  children: React.ReactNode; // Content of the Ripple
  borderless?: boolean; // Whether to render the ripple outside the view bounds
  rippleColor?: ColorValue; // Color of the ripple effect
  rippleOpcity?: number; // Opacity of th ripple effect
  rippleDuration?: number; // Duration of th ripple effect
  underlayColor?: ColorValue; // Color of the underlay for the highlight effect
  centered?: boolean; // Whether to start the ripple at the center
  disabled?: boolean; // Whether to prevent interaction with the touchable.
}

type RippleElementConfig = {
  uid: number;
  centerX: number;
  centerY: number;
  rippleAnim: Animated.Value;
  R: number;
};

const RippleElement = (props: { rippleConfig: RippleElementConfig }) => {
  const {
    rippleConfig: { centerX, centerY, rippleAnim, R },
  } = props;

  const animatedStyle = {
    top: centerY - R,
    left: centerX - R,
    width: 2 * R,
    height: 2 * R,
    borderRadius: R,
    backgroundColor: 'rgb(0, 0, 0)',
    opacity: 0.3,
    transform: [{ scale: rippleAnim }, { perspective: 1000 }],
  };

  return (
    <Animated.View
      style={[styles.rippleElement, animatedStyle]}
    ></Animated.View>
  );
};

export const Ripple: React.FC<RippleProps> = props => {
  const {
    children,
    borderless,
    rippleColor = 'rgb(0, 0, 0)',
    rippleOpcity = 0.3,
    rippleDuration = 400,
    underlayColor,
    centered = false,
    disabled = false,
    ...rest
  } = props;
  const [target, setTarget] = useState({
    width: 0,
    height: 0,
  });

  const [ripples, setRipples] = useState<RippleElementConfig[]>([]);

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setTarget({
      width,
      height,
    });
  }

  function handlePressIn(event: GestureResponderEvent) {
    const { locationX, locationY, timestamp } = event.nativeEvent;
    const halfW = target.width * 0.5;
    const halfH = target.height * 0.5;
    const centerX = centered ? halfW : locationX;
    const centerY = centered ? halfH : locationY;
    const offsetX = Math.abs(centerX - halfW);
    const offsetY = Math.abs(centerY - halfH);
    const R = Math.sqrt((halfW + offsetX) ** 2 + (halfH + offsetY) ** 2);
    const ripple = {
      uid: timestamp,
      centerX,
      centerY,
      rippleAnim: new Animated.Value(0),
      R,
    };

    Animated.timing(ripple.rippleAnim, {
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      duration: 800,
      useNativeDriver: true,
    }).start();

    setRipples(ripples => ripples.concat(ripple));
  }

  function handlePressOut(event: GestureResponderEvent) {
    const { timestamp } = event.nativeEvent;
    if (ripples.length === 1 && timestamp - ripples[0].uid > 800) {
      setRipples(ripples => ripples.slice(1));
    } else {
      setTimeout(() => {
        setRipples(ripples => ripples.slice(1));
      }, 800);
    }
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={{
        overflow: 'hidden',
      }}
      {...rest}
    >
      {children}
      {ripples.map(rippleConfig => (
        <RippleElement key={rippleConfig.uid} rippleConfig={rippleConfig} />
      ))}
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  rippleElement: {
    position: 'absolute',
  },
});
