import { isWeb } from "../utils.js";
import Ripple$1 from "./Ripple.js";
import RippleWeb from "./Ripple.web.js";
import "react-native";
import "react";
import "./utils.js";
import "./RippleElement.js";
const Ripple = isWeb ? RippleWeb : Ripple$1;
export {
  Ripple
};
