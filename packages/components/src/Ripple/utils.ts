import { Animated, Easing, GestureResponderEvent } from 'react-native';
import { RippleElementConfig } from './ripple.type';

export const RippleElementTestId = 'RippleElementTestId';

export function getRipple(
  event: GestureResponderEvent,
  targetWidth: number,
  targetHeight: number,
  isCentered: boolean,
) {
  const { locationX, locationY, timestamp } = event.nativeEvent;
  const halfW = targetWidth * 0.5;
  const halfH = targetHeight * 0.5;
  const centerX = isCentered ? halfW : locationX;
  const centerY = isCentered ? halfH : locationY;
  const offsetX = Math.abs(centerX - halfW);
  const offsetY = Math.abs(centerY - halfH);
  const R = Math.sqrt((halfW + offsetX) ** 2 + (halfH + offsetY) ** 2);
  return {
    uid: timestamp,
    centerX,
    centerY,
    rippleAnim: new Animated.Value(0),
    R,
  };
}

export function startAnimated(
  ripple: RippleElementConfig,
  duration: number,
  callback?: (finished: boolean) => void,
) {
  Animated.timing(ripple.rippleAnim, {
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
    duration,
    useNativeDriver: true,
  }).start(({ finished }) => callback?.(finished));
}
