import { isWeb } from '../utils';
import RippleNative from './Ripple';
import RippleWeb from './Ripple.web';
import { RippleProps } from './ripple.type';

export type { RippleProps };

// In react-native-web, the onPress parameter is MouseEvent instead of ResponderEvent
// , causing the uid and locationX deconstructed from event.nativeEvent to be undefined
// in getRipple().
// Therefore, use onPressIn to replace onPress in RippleWeb
// https://necolas.github.io/react-native-web/docs/pressable/
const Ripple = isWeb ? RippleWeb : RippleNative;
export { Ripple };
