"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const reactNative = require("react-native");
const Ripple_Ripple = require("../Ripple/Ripple.js");
const Button_style = require("./style.js");
require("react");
require("../utils.js");
require("../Ripple/utils.js");
require("../Ripple/RippleElement.js");
require("../Style/theming.js");
require("../tokens-50ba0476.js");
const Button = ({
  variant = "text",
  loading,
  loadingIcon = /* @__PURE__ */ React.createElement(reactNative.ActivityIndicator, null),
  loadingText,
  disabled,
  children,
  startIcon,
  endIcon,
  // interactionEffect,
  onPress,
  containerStyle,
  textStyle
}) => {
  const buttonStyles = Button_style.useStyle(
    containerStyle,
    textStyle,
    variant,
    disabled,
    loading,
    Boolean(startIcon),
    Boolean(endIcon),
    Boolean(loadingText)
  );
  const handlePress = (event) => {
    console.log("event");
    if (!loading && !disabled && Boolean(onPress)) {
      onPress == null ? void 0 : onPress(event);
    }
  };
  return /* @__PURE__ */ React.createElement(
    Ripple_Ripple.default,
    {
      disabled,
      onPress: handlePress,
      style: buttonStyles.container
    },
    !loading && Boolean(startIcon) && /* @__PURE__ */ React.createElement(IconWrapper, { style: buttonStyles.iconStart }, startIcon),
    loading && /* @__PURE__ */ React.createElement(IconWrapper, { style: buttonStyles.iconLoading }, loadingIcon),
    /* @__PURE__ */ React.createElement(reactNative.Text, { selectable: false, style: buttonStyles.content }, loading && loadingText ? loadingText : children),
    !loading && Boolean(endIcon) && /* @__PURE__ */ React.createElement(IconWrapper, { style: buttonStyles.iconEnd }, endIcon)
  );
};
function IconWrapper(props) {
  return /* @__PURE__ */ React.createElement(reactNative.View, { style: props.style }, props.children);
}
exports.Button = Button;
