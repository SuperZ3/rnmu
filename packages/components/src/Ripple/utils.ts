import { Animated, Easing, GestureResponderEvent } from 'react-native';
import { RippleElementConfig } from './ripple.type';
import { isNumber, isWeb } from '../utils';

export const RippleElementTestId = 'RippleElementTestId';

export function getRipple(
  event: GestureResponderEvent,
  targetWidth: number,
  targetHeight: number,
  isCentered: boolean,
) {
  let { locationX, locationY } = event.nativeEvent;
  if (
    isWeb &&
    'offsetX' in event.nativeEvent &&
    isNumber(event.nativeEvent.offsetX) &&
    'offsetY' in event.nativeEvent &&
    isNumber(event.nativeEvent.offsetY)
  ) {
    locationX = event.nativeEvent.offsetX;
    locationY = event.nativeEvent.offsetY;
  }
  const halfW = targetWidth * 0.5;
  const halfH = targetHeight * 0.5;
  let emitedX = locationX;
  let emitedY = locationY;
  if (isCentered) {
    emitedX = halfW;
    emitedY = halfH;
  }
  const offsetX = Math.abs(emitedX - halfW);
  const offsetY = Math.abs(emitedY - halfH);
  const R = Math.sqrt((halfW + offsetX) ** 2 + (halfH + offsetY) ** 2);
  return {
    uid: event.nativeEvent.timestamp,
    emitedX,
    emitedY,
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
