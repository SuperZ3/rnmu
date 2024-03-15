/// <reference types="react" />
import { ColorValue, PressableProps } from 'react-native';
export interface RippleProps extends PressableProps {
    children: PressableProps['children'];
    borderless?: boolean;
    foreground?: boolean;
    rippleColor?: ColorValue;
    rippleOpcity?: number;
    rippleDuration?: number;
    underlayColor?: ColorValue;
    centered?: boolean;
    disabled?: boolean;
}
export declare const Ripple: React.FC<RippleProps>;
export declare const styles: {
    rippleElement: {
        position: "absolute";
        pointerEvents: "none";
        zIndex: number;
    };
};
