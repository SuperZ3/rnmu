import { useRef, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
} from 'react-native';
import { isFunction } from '../utils';
import { getRipple, startAnimated } from './utils';
import { RippleElementConfig, RippleProps } from './ripple.type';
import RippleElement from './RippleElement';

const Ripple: React.FC<RippleProps> = props => {
  const {
    children,
    foreground = false,
    rippleColor = 'rgb(0, 0, 0)',
    rippleOpcity = 0.2,
    rippleDuration = 400,
    underlayColor,
    centered = false,
    disableEffect = false,
    onPress,
    onPressOut,
    onLongPress,
    onLayout,
    style,
    ...rest
  } = props;
  const [target, setTarget] = useState({
    width: 0,
    height: 0,
  });
  const [ripples, setRipples] = useState<RippleElementConfig[]>([]);
  const isLongPress = useRef<boolean>(false);

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setTarget({
      width,
      height,
    });
    onLayout?.(event);
  }

  function handlePress(event: GestureResponderEvent) {
    if (!disableEffect) {
      isLongPress.current = false;
      const ripple = getRipple(event, target.width, target.height, centered);
      startAnimated(
        ripple,
        rippleDuration,
        finished => finished && setRipples(ripples => ripples.slice(1)),
      );
      setRipples(ripples => ripples.concat(ripple));
    }
    onPress?.(event);
  }

  function handleLongPress(event: GestureResponderEvent) {
    if (!disableEffect) {
      isLongPress.current = true;
      const ripple = getRipple(event, target.width, target.height, centered);
      startAnimated(ripple, rippleDuration);
      setRipples(ripples => ripples.concat(ripple));
    }
    onLongPress?.(event);
  }

  function handlePressOut(event: GestureResponderEvent) {
    if (isLongPress.current) {
      isLongPress.current = false;
      if (ripples.length > 0) {
        const outTimeStemp = event.nativeEvent.timestamp;
        ripples.forEach(ripple => {
          const delay =
            outTimeStemp - ripple.uid > rippleDuration ? 0 : rippleDuration;
          setTimeout(() => {
            setRipples(ripples => ripples.slice(1));
          }, delay);
        });
      }
    }
    onPressOut?.(event);
  }

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={pressed => [
        { overflow: 'hidden' },
        isFunction(style) ? style(pressed) : style,
      ]}
      {...rest}
    >
      {pressed => {
        return (
          <>
            {isFunction(children) ? children(pressed) : children}
            {ripples.map(rippleConfig => (
              <RippleElement
                key={rippleConfig.uid}
                rippleConfig={rippleConfig}
                rippleOpacity={rippleOpcity}
                rippleColor={rippleColor}
                isForeground={foreground}
              />
            ))}
          </>
        );
      }}
    </Pressable>
  );
};

export default Ripple;
