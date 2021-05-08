var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _propTypes=_interopRequireDefault(require("prop-types"));var _styles=require("../../styles");var _jsxFileName="/Users/wanda.chereji/development/WorkoutAssistant/src/components/molecules/submitButton.js";var SubmitButton=function SubmitButton(_ref){var title=_ref.title,handleOnPress=_ref.handleOnPress;return _react.default.createElement(_reactNative.TouchableOpacity,{style:styles.submitButton,onPress:function onPress(){handleOnPress();},__source:{fileName:_jsxFileName,lineNumber:13,columnNumber:9}},_react.default.createElement(_reactNative.Text,{style:styles.text,__source:{fileName:_jsxFileName,lineNumber:18,columnNumber:13}},title));};SubmitButton.propTypes={title:_propTypes.default.string,handleOnPress:_propTypes.default.func};var styles=_reactNative.StyleSheet.create({submitButton:{backgroundColor:_styles.Colors.ACCENT_COLOR,borderRadius:8,height:44,alignItems:'center',justifyContent:'center',marginBottom:50},text:{color:_styles.Colors.WHITE,fontSize:18,textTransform:'uppercase'}});var _default=SubmitButton;exports.default=_default;