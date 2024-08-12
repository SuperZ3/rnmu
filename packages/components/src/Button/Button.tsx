import { FC, ReactNode, ReactElement } from 'react';
import {
  ActivityIndicator,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  // TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Ripple, RippleProps } from '../Ripple';
import { useStyle } from './style';

export interface ButtonProps {
  // Children of the button
  children: string;
  // Types of button, used for different emphasis, default is 'text'
  // - text: button without background or outlined, used for low emphasis actions
  // - filled: filled button’s contrasting surface color and without outlined, used for high emphasis actions
  // - outlined: button with outlined and without background color, used for second primary acions
  variant?: 'text' | 'filled' | 'outlined';
  // Prop to display a loading spinner
  loading?: boolean;
  // Loading icon
  loadingIcon?: ReactElement;
  // Loading text
  loadingText?: string;
  // Interaction effect with press, no effect when false
  interactionEffect?:
    | false
    | 'highlight'
    | Pick<
        RippleProps,
        'rippleColor' | 'rippleDuration' | 'rippleOpcity' | 'centered'
      >;
  // Disables user interaction
  disabled?: boolean;
  // 2 ~ 24 levels of shadow depth, the true value equals 2, only used in filled type
  elevation?: number | true;
  // icons
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  // Press event
  onPress?: PressableProps['onPress'];
  /** Styling for Component container. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Add additional styling for title component. */
  textStyle?: StyleProp<TextStyle>;
}

export const Button: FC<ButtonProps> = ({
  variant = 'text',
  loading,
  loadingIcon = <ActivityIndicator />,
  loadingText,
  disabled,
  children,
  startIcon,
  endIcon,
  // interactionEffect,
  onPress,
  containerStyle,
  textStyle,
}) => {
  const buttonStyles = useStyle(
    containerStyle,
    textStyle,
    variant,
    disabled,
    loading,
    Boolean(startIcon),
    Boolean(endIcon),
    Boolean(loadingText),
  );

  const handlePress: PressableProps['onPress'] = event => {
    console.log('event');
    if (!loading && !disabled && Boolean(onPress)) {
      onPress?.(event);
    }
  };

  return (
    <Ripple
      disabled={disabled}
      onPress={handlePress}
      // activeOpacity={activeOpacity}
      style={buttonStyles.container}
    >
      {!loading && Boolean(startIcon) && (
        <IconWrapper style={buttonStyles.iconStart}>{startIcon}</IconWrapper>
      )}
      {loading && (
        <IconWrapper style={buttonStyles.iconLoading}>
          {loadingIcon}
        </IconWrapper>
      )}
      <Text selectable={false} style={buttonStyles.content}>
        {loading && loadingText ? loadingText : children}
      </Text>
      {!loading && Boolean(endIcon) && (
        <IconWrapper style={buttonStyles.iconEnd}>{endIcon}</IconWrapper>
      )}
    </Ripple>
  );
};

interface IconWrapperProps {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

function IconWrapper(props: IconWrapperProps) {
  return <View style={props.style}>{props.children}</View>;
}
