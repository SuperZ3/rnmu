import { Text, ActivityIndicator, View } from "react-native";
import Ripple from "../Ripple/Ripple.js";
import { useStyle } from "./style.js";
import "react";
import "../utils.js";
import "../Ripple/utils.js";
import "../Ripple/RippleElement.js";
import "../Style/theming.js";
import "../tokens-836f82f1.mjs";
const Button = ({
  variant = "text",
  loading,
  loadingIcon = /* @__PURE__ */ React.createElement(ActivityIndicator, null),
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
  const buttonStyles = useStyle(
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
    Ripple,
    {
      disabled,
      onPress: handlePress,
      style: buttonStyles.container
    },
    !loading && Boolean(startIcon) && /* @__PURE__ */ React.createElement(IconWrapper, { style: buttonStyles.iconStart }, startIcon),
    loading && /* @__PURE__ */ React.createElement(IconWrapper, { style: buttonStyles.iconLoading }, loadingIcon),
    /* @__PURE__ */ React.createElement(Text, { selectable: false, style: buttonStyles.content }, loading && loadingText ? loadingText : children),
    !loading && Boolean(endIcon) && /* @__PURE__ */ React.createElement(IconWrapper, { style: buttonStyles.iconEnd }, endIcon)
  );
};
function IconWrapper(props) {
  return /* @__PURE__ */ React.createElement(View, { style: props.style }, props.children);
}
export {
  Button
};
