"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const react = require("react");
const reactNative = require("react-native");
const utils = require("../utils.js");
const Ripple_utils = require("./utils.js");
const Ripple_RippleElement = require("./RippleElement.js");
const Ripple = (props) => {
  const {
    children,
    foreground = false,
    rippleColor = "rgb(0, 0, 0)",
    rippleOpcity = 0.2,
    rippleDuration = 400,
    underlayColor,
    centered = false,
    disableEffect = false,
    onPress,
    onPressOut,
    onLongPress,
    onLayout,
    style,
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
    if (!disableEffect) {
      isLongPress.current = false;
      const ripple = Ripple_utils.getRipple(event, target.width, target.height, centered);
      Ripple_utils.startAnimated(
        ripple,
        rippleDuration,
        (finished) => finished && setRipples((ripples2) => ripples2.slice(1))
      );
      setRipples((ripples2) => ripples2.concat(ripple));
    }
    onPress == null ? void 0 : onPress(event);
  }
  function handleLongPress(event) {
    if (!disableEffect) {
      isLongPress.current = true;
      const ripple = Ripple_utils.getRipple(event, target.width, target.height, centered);
      Ripple_utils.startAnimated(ripple, rippleDuration);
      setRipples((ripples2) => ripples2.concat(ripple));
    }
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
      style: (pressed) => [
        { overflow: "hidden" },
        utils.isFunction(style) ? style(pressed) : style
      ],
      ...rest
    },
    (pressed) => {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, utils.isFunction(children) ? children(pressed) : children, ripples.map((rippleConfig) => /* @__PURE__ */ React.createElement(
        Ripple_RippleElement.default,
        {
          key: rippleConfig.uid,
          rippleConfig,
          rippleOpacity: rippleOpcity,
          rippleColor,
          isForeground: foreground
        }
      )));
    }
  );
};
exports.default = Ripple;
