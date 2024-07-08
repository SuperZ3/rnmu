import { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '../Style/theming';

export function useStyle(
  containerStyle: StyleProp<ViewStyle>,
  textStyle: StyleProp<TextStyle>,
  variant: 'text' | 'filled' | 'outlined',
  disabled?: boolean,
  loading?: boolean,
  hasStartIcon?: boolean,
  hasEndIcon?: boolean,
  hasLoadingText?: boolean,
) {
  const theme = useTheme();
  const isText = variant === 'text';
  const isFilled = variant === 'filled';
  return useMemo(() => {
    return {
      container: [
        styles.container,
        isText && styles.borderW1,
        isFilled && styles.buttonBg,
        containerStyle,
      ],
      iconStart: [
        styles.icon,
        styles.iconStart,
        isText && styles.iconTextStart,
      ],
      iconEnd: [styles.icon, styles.iconEnd, isText && styles.iconTextEnd],
      iconLoading: [
        styles.icon,
        styles.iconStart,
        hasEndIcon && styles.iconEnd,
        isText && styles.iconCenter,
      ],
      content: [
        styles.marginY10,
        styles.marginX12,
        isText && (hasStartIcon || hasEndIcon) && styles.marginX16,
        !isText && styles.marginX24,
        loading &&
          !hasLoadingText &&
          !hasStartIcon &&
          !hasEndIcon &&
          styles.textHidden,
        textStyle,
      ],
    };
  }, [
    containerStyle,
    textStyle,
    disabled,
    loading,
    theme,
    hasStartIcon,
    hasEndIcon,
    hasLoadingText,
  ]);
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonShadow: {
    shadowColor: '#171717',
    shadowOpacity: 0.85,
    shadowRadius: 3,
    backgroundColor: 'transparent',
  },
  loadingPosEnd: {
    flexDirection: 'row-reverse',
  },
  textHidden: {
    opacity: 0,
  },
  buttonBg: {
    backgroundColor: '#6750A4',
  },
  borderW1: {
    borderStyle: 'solid',
  },
  marginX12: {
    marginHorizontal: 12,
  },
  marginX16: {
    marginHorizontal: 16,
  },
  marginX24: {
    marginHorizontal: 24,
  },
  marginY10: {
    marginVertical: 10,
  },
  icon: {
    width: 18,
    height: 18,
  },
  iconCenter: {
    position: 'absolute',
    marginStart: 0,
    marginEnd: 0,
  },
  iconStart: {
    marginStart: 16,
    marginEnd: -16,
  },
  iconEnd: {
    marginStart: -16,
    marginEnd: 16,
  },
  iconTextStart: {
    marginStart: 12,
    marginEnd: -8,
  },
  iconTextEnd: {
    marginStart: -8,
    marginEnd: 12,
  },
});
