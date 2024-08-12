import { Platform } from 'react-native';

export function isFunction(v: unknown): v is CallableFunction {
  return v instanceof Function;
}

export function isString(v: unknown): v is string {
  return typeof v === 'string';
}

export function isNumber(v: unknown): v is number {
  return typeof v === 'number';
}

export const isWeb = Platform.OS === 'web';
