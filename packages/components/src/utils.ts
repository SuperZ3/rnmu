import { Platform } from 'react-native';

export function isFunction(v: unknown): v is CallableFunction {
  return v instanceof Function;
}

export function isString(v: unknown): v is string {
  return typeof v === 'string';
}

export const isWeb = Platform.OS === 'web';
