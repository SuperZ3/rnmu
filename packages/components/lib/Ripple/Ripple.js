"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const react = require("react");
const reactNative = require("react-native");
const RippleElement = (props) => {
  const {
    rippleConfig: { centerX, centerY, rippleAnim, R },
    opacity,
    backgroundColor
  } = props;
  const animatedStyle = {
    top: centerY - R,
    left: centerX - R,
    width: 2 * R,
    height: 2 * R,
    borderRadius: R,
    backgroundColor,
    opacity: rippleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, opacity]
    }),
    transform: [{ scale: rippleAnim }, { perspective: 1e3 }]
  };
  return /* @__PURE__ */ React.createElement(
    reactNative.Animated.View,
    {
      style: [styles.rippleElement, animatedStyle]
    }
  );
};
function getRipple(event, targetWidth, targetHeight, isCentered) {
  const { locationX, locationY, timestamp } = event.nativeEvent;
  const halfW = targetWidth * 0.5;
  const halfH = targetHeight * 0.5;
  const centerX = isCentered ? halfW : locationX;
  const centerY = isCentered ? halfH : locationY;
  const offsetX = Math.abs(centerX - halfW);
  const offsetY = Math.abs(centerY - halfH);
  const R = Math.sqrt((halfW + offsetX) ** 2 + (halfH + offsetY) ** 2);
  return {
    uid: timestamp,
    centerX,
    centerY,
    rippleAnim: new reactNative.Animated.Value(0),
    R
  };
}
function startAnimated(ripple, duration, callback) {
  reactNative.Animated.timing(ripple.rippleAnim, {
    toValue: 1,
    easing: reactNative.Easing.inOut(reactNative.Easing.ease),
    duration,
    useNativeDriver: true
  }).start(({ finished }) => callback == null ? void 0 : callback(finished));
}
const Ripple = (props) => {
  const {
    children,
    foreground = false,
    rippleColor = "rgb(0, 0, 0)",
    rippleOpcity = 0.3,
    rippleDuration = 400,
    underlayColor,
    centered = false,
    disabled = false,
    borderless = false,
    onPress,
    onPressOut,
    onLongPress,
    onLayout,
    delayLongPress = 200,
    style = () => {
    },
    ...rest
  } = props;
  const [target, setTarget] = react.useState({
    width: 0,
    height: 0
  });
  const [ripples, setRipples] = react.useState([]);
  const isLongPress = react.useRef(false);
  function handleLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    setTarget({
      width,
      height
    });
    onLayout == null ? void 0 : onLayout(event);
  }
  function handlePress(event) {
    const ripple = getRipple(event, target.width, target.height, centered);
    startAnimated(ripple, rippleDuration, (finished) => finished && setRipples((ripples2) => ripples2.slice(1)));
    setRipples((ripples2) => ripples2.concat(ripple));
    onPress == null ? void 0 : onPress(event);
  }
  function handleLongPress(event) {
    isLongPress.current = true;
    const ripple = getRipple(event, target.width, target.height, centered);
    startAnimated(ripple, rippleDuration);
    setRipples((ripples2) => ripples2.concat(ripple));
    onLongPress == null ? void 0 : onLongPress(event);
  }
  function handlePressOut(event) {
    if (isLongPress.current) {
      isLongPress.current = false;
      if (ripples.length > 0) {
        const outTimeStemp = event.nativeEvent.timestamp;
        ripples.forEach((ripple) => {
          const delay = outTimeStemp - ripple.uid > rippleDuration ? 0 : rippleDuration;
          setTimeout(() => {
            setRipples((ripples2) => ripples2.slice(1));
          }, delay);
        });
      }
    }
    onPressOut == null ? void 0 : onPressOut(event);
  }
  return /* @__PURE__ */ React.createElement(
    reactNative.Pressable,
    {
      onPress: handlePress,
      onLongPress: handleLongPress,
      onPressOut: handlePressOut,
      onLayout: handleLayout,
      delayLongPress,
      style: { overflow: borderless ? "visible" : "hidden" },
      ...rest
    },
    (pressed) => {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, typeof children === "function" ? children(pressed) : children, ripples.map((rippleConfig) => /* @__PURE__ */ React.createElement(RippleElement, { key: rippleConfig.uid, rippleConfig, opacity: rippleOpcity, backgroundColor: rippleColor })));
    }
  );
};
const styles = reactNative.StyleSheet.create({
  rippleElement: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1
  }
});
exports.Ripple = Ripple;
exports.styles = styles;
