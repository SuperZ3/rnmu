import { Key } from 'react';
import { Animated, ColorValue, PressableProps } from 'react-native';

export interface RippleProps extends PressableProps {
  children: PressableProps['children']; // Content of the Ripple
  foreground?: boolean; // Set to true to add the ripple effect to the foreground of the view
  rippleColor?: ColorValue; // Color of the ripple effect
  rippleOpcity?: number; // Opacity of th ripple effect
  rippleDuration?: number; // Duration of th ripple effect
  underlayColor?: ColorValue; // Color of the underlay for the highlight effect
  centered?: boolean; // Whether to start the ripple at the center
  disabled?: boolean; // Whether to prevent interaction with the touchable.
}

export type RippleElementConfig = {
  uid: number;
  centerX: number;
  centerY: number;
  rippleAnim: Animated.Value;
  R: number;
};

export interface RippleElementProps {
  rippleColor: ColorValue;
  rippleOpacity: number;
  isForeground: boolean;
  rippleConfig: RippleElementConfig;
  key: Key;
}
