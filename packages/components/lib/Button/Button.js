"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const reactNative = require("react-native");
const Ripple_index = require("../Ripple/index.js");
require("../utils.js");
require("../Ripple/Ripple.js");
require("react");
require("../Ripple/utils.js");
require("../Ripple/RippleElement.js");
require("../Ripple/Ripple.web.js");
const Button = (props) => {
  const {
    variant = "text",
    loading,
    loadingIcon,
    loadingText,
    disabled,
    children,
    startIcon,
    endIcon,
    interactionEffect,
    onPress
  } = props;
  const handlePress = (event) => {
    if (!loading && !disabled && Boolean(onPress)) {
      onPress == null ? void 0 : onPress(event);
    }
  };
  const Touchable = interactionEffect === "highlight" ? reactNative.TouchableOpacity : Ripple_index.Ripple;
  return /* @__PURE__ */ React.createElement(
    Touchable,
    {
      disabled,
      onPress: handlePress,
      delayLongPress: 0,
      style: [
        styles.buttonBase,
        // TODO: 根据类型计算颜色属性，减少判断
        variant === "outlined" && styles.borderW1,
        variant === "filled" && styles.buttonBg,
        loading && !startIcon && Boolean(endIcon) && styles.loadingPosEnd
        // pressed && styles.highLight
      ]
    },
    !loading && Boolean(startIcon) && /* @__PURE__ */ React.createElement(IconWrapper, { start: true, isText: variant === "text" }, startIcon),
    loading && /* @__PURE__ */ React.createElement(
      IconWrapper,
      {
        isText: variant === "text",
        start: true,
        end: !Boolean(startIcon) && Boolean(endIcon),
        center: !loadingText && !Boolean(startIcon) && !Boolean(endIcon)
      },
      loadingIcon || /* @__PURE__ */ React.createElement(reactNative.ActivityIndicator, { style: { width: 18, height: 18, margin: 0 } })
    ),
    /* @__PURE__ */ React.createElement(
      reactNative.Text,
      {
        selectable: false,
        style: [
          styles.marginY10,
          styles.marginX12,
          variant === "text" && (Boolean(startIcon) || Boolean(endIcon)) && styles.marginX16,
          variant !== "text" && styles.marginX24,
          loading && !loadingText && !Boolean(startIcon) && !Boolean(endIcon) && styles.textHidden
        ]
      },
      loading && loadingText ? loadingText : children
    ),
    !loading && Boolean(endIcon) && /* @__PURE__ */ React.createElement(IconWrapper, { end: true, isText: variant === "text" }, endIcon)
  );
};
function IconWrapper(props) {
  const { children, start, end, isText, center } = props;
  return /* @__PURE__ */ React.createElement(
    reactNative.View,
    {
      style: [
        styles.icon,
        start && styles.iconStart,
        end && styles.iconEnd,
        start && isText && styles.iconTextStart,
        end && isText && styles.iconTextEnd,
        center && styles.iconCenter
      ]
    },
    children
  );
}
const styles = reactNative.StyleSheet.create({
  buttonBase: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden"
  },
  highLight: {
    opacity: 0.2
  },
  loadingPosEnd: {
    flexDirection: "row-reverse"
  },
  textHidden: {
    opacity: 0
  },
  buttonBg: {
    backgroundColor: "#6750A4"
  },
  borderW1: {
    borderStyle: "solid"
  },
  marginX12: {
    marginHorizontal: 12
  },
  marginX16: {
    marginHorizontal: 16
  },
  marginX24: {
    marginHorizontal: 24
  },
  marginY10: {
    marginVertical: 10
  },
  icon: {
    width: 18,
    height: 18
  },
  iconCenter: {
    position: "absolute",
    marginStart: 0,
    marginEnd: 0
  },
  iconStart: {
    marginStart: 16,
    marginEnd: -16
  },
  iconEnd: {
    marginStart: -16,
    marginEnd: 16
  },
  iconTextStart: {
    marginStart: 12,
    marginEnd: -8
  },
  iconTextEnd: {
    marginStart: -8,
    marginEnd: 12
  }
});
exports.Button = Button;
exports.styles = styles;
