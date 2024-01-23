import { Platform } from 'react-native';

export function isFunction(v: unknown): v is CallableFunction {
  return v instanceof Function;
}

export const isWeb = Platform.OS === 'web';
