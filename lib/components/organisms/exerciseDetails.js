var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _styles=require("../../styles");var _jsxFileName="/Users/wanda.chereji/development/WorkoutAssistant/src/components/organisms/exerciseDetails.js";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){(0,_defineProperty2.default)(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var TextRow=function TextRow(_ref){var keyText=_ref.keyText,valueText=_ref.valueText;return _react.default.createElement(_reactNative.View,{style:styles.rowContainer,__source:{fileName:_jsxFileName,lineNumber:12,columnNumber:9}},_react.default.createElement(_reactNative.Text,{style:_objectSpread(_objectSpread({},styles.textStyle),{},{flex:1}),__source:{fileName:_jsxFileName,lineNumber:13,columnNumber:13}},keyText),_react.default.createElement(_reactNative.Text,{style:_objectSpread(_objectSpread({},styles.textStyle),{},{flex:3}),__source:{fileName:_jsxFileName,lineNumber:14,columnNumber:13}},valueText));};var ExerciseDetails=function ExerciseDetails(_ref2){var data=_ref2.data;return _react.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:21,columnNumber:9}},_react.default.createElement(TextRow,{keyText:"Exercise: ",valueText:data.name,__source:{fileName:_jsxFileName,lineNumber:22,columnNumber:13}}),_react.default.createElement(TextRow,{keyText:"Category: ",valueText:data.category,__source:{fileName:_jsxFileName,lineNumber:23,columnNumber:13}}),_react.default.createElement(TextRow,{keyText:"Equipment: ",valueText:data.equipment,__source:{fileName:_jsxFileName,lineNumber:24,columnNumber:13}}),_react.default.createElement(TextRow,{keyText:"Description: ",valueText:data.description,__source:{fileName:_jsxFileName,lineNumber:25,columnNumber:13}}),_react.default.createElement(TextRow,{keyText:"Muscles: ",valueText:data.muscles,__source:{fileName:_jsxFileName,lineNumber:26,columnNumber:13}}));};var styles=_reactNative.StyleSheet.create({rowContainer:{flexDirection:'row'},textStyle:{color:_styles.Colors.PRIMARY_COLOR}});var _default=ExerciseDetails;exports.default=_default;