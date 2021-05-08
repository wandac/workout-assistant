var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.fetchExercise=exports.fetchingExerciseFailure=exports.fetchingExerciseSuccess=exports.fetchingExerciseRequest=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _utils=require("../../utils/");var _types=require("./types");var fetchingExerciseRequest=function fetchingExerciseRequest(){return{type:_types.FETCHING_EXERCISE_REQUEST};};exports.fetchingExerciseRequest=fetchingExerciseRequest;var fetchingExerciseSuccess=function fetchingExerciseSuccess(json){return{type:_types.FETCHING_EXERCISE_SUCCESS,payload:json};};exports.fetchingExerciseSuccess=fetchingExerciseSuccess;var fetchingExerciseFailure=function fetchingExerciseFailure(error){return{type:_types.FETCHING_EXERCISE_FAILURE,payload:error};};exports.fetchingExerciseFailure=fetchingExerciseFailure;var fetchExercise=function fetchExercise(){return function _callee(dispatch){var response,json;return _regenerator.default.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:dispatch(fetchingExerciseRequest());_context.prev=1;_context.next=4;return _regenerator.default.awrap(fetch(_utils.Constants.WGER_API_PATH+_utils.Constants.WGER_EXERCISE_ENDPOINT));case 4:response=_context.sent;_context.next=7;return _regenerator.default.awrap(response.json());case 7:json=_context.sent;dispatch(fetchingExerciseSuccess(json));_context.next=14;break;case 11:_context.prev=11;_context.t0=_context["catch"](1);dispatch(fetchingExerciseFailure(_context.t0));case 14:case"end":return _context.stop();}}},null,null,[[1,11]],Promise);};};exports.fetchExercise=fetchExercise;