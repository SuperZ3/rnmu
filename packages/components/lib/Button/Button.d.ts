import { FC, ReactNode, ReactElement } from 'react';
import { PressableProps } from 'react-native';
import { RippleProps } from '../Ripple';
export interface ButtonProps {
    children: string;
    variant?: 'text' | 'filled' | 'outlined';
    loading?: boolean;
    loadingIcon?: ReactElement<{}>;
    loadingText?: string;
    interactionEffect?: false | 'highlight' | Pick<RippleProps, 'rippleColor' | 'rippleDuration' | 'rippleOpcity' | 'centered'>;
    disabled?: boolean;
    elevation?: number | true;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    onPress?: PressableProps['onPress'];
}
export declare const Button: FC<ButtonProps>;
export declare const styles: {
    buttonBase: {
        display: "flex";
        flexDirection: "row";
        flexWrap: "nowrap";
        justifyContent: "center";
        alignItems: "center";
        borderRadius: number;
        overflow: "hidden";
    };
    highLight: {
        opacity: number;
    };
    loadingPosEnd: {
        flexDirection: "row-reverse";
    };
    textHidden: {
        opacity: number;
    };
    buttonBg: {
        backgroundColor: string;
    };
    borderW1: {
        borderStyle: "solid";
    };
    marginX12: {
        marginHorizontal: number;
    };
    marginX16: {
        marginHorizontal: number;
    };
    marginX24: {
        marginHorizontal: number;
    };
    marginY10: {
        marginVertical: number;
    };
    icon: {
        width: number;
        height: number;
    };
    iconCenter: {
        position: "absolute";
        marginStart: number;
        marginEnd: number;
    };
    iconStart: {
        marginStart: number;
        marginEnd: number;
    };
    iconEnd: {
        marginStart: number;
        marginEnd: number;
    };
    iconTextStart: {
        marginStart: number;
        marginEnd: number;
    };
    iconTextEnd: {
        marginStart: number;
        marginEnd: number;
    };
};
