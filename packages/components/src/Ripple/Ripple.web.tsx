import { useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
} from 'react-native';
import { isFunction } from '../utils';
import { getRipple, startAnimated } from './utils';
import { RippleElementConfig, RippleProps } from './ripple.type';
import RippleElement from './RippleElement';

const RippleWeb: React.FC<RippleProps> = props => {
  const {
    children,
    foreground = false,
    rippleColor = 'rgb(0, 0, 0)',
    rippleOpcity = 0.3,
    rippleDuration = 400,
    underlayColor,
    centered = false,
    disabled = false,
    onPressIn,
    onPressOut,
    onLayout,
    style,
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
    onLayout?.(event);
  }

  function handlePressIn(event: GestureResponderEvent) {
    const ripple = getRipple(event, target.width, target.height, centered);
    startAnimated(ripple, rippleDuration);
    setRipples(ripples => ripples.concat(ripple));
    onPressIn?.(event);
  }

  function handlePressOut(event: GestureResponderEvent) {
    const outTimeStemp = event.nativeEvent.timestamp;
    if (ripples.length > 0) {
      // make longPress finish as soon as possible
      const delay =
        ripples.length === 1 && outTimeStemp - ripples[0].uid > rippleDuration
          ? 0
          : rippleDuration;
      setTimeout(() => {
        setRipples(ripples => ripples.slice(1));
      }, delay);
    }
    onPressOut?.(event);
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={pressed => [
        { overflow: 'hidden' },
        isFunction(style) ? style(pressed) : style,
      ]}
      disabled={disabled}
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

export default RippleWeb;
