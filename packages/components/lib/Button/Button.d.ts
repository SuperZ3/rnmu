import { FC, ReactNode, ReactElement } from 'react';
import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { RippleProps } from '../Ripple';
export interface ButtonProps {
    children: string;
    variant?: 'text' | 'filled' | 'outlined';
    loading?: boolean;
    loadingIcon?: ReactElement;
    loadingText?: string;
    interactionEffect?: false | 'highlight' | Pick<RippleProps, 'rippleColor' | 'rippleDuration' | 'rippleOpcity' | 'centered'>;
    disabled?: boolean;
    elevation?: number | true;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onPress?: PressableProps['onPress'];
    /** Styling for Component container. */
    containerStyle?: StyleProp<ViewStyle>;
    /** Add additional styling for title component. */
    textStyle?: StyleProp<TextStyle>;
}
export declare const Button: FC<ButtonProps>;
