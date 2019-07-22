'use strict';var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}/**
 * File generated with objection-model-generator OMG!!!!
 */var _require=require('objection'),Model=_require.Model,AccessUserModel=void 0,ChatMessageModel=void 0;/**
 * access_users model
 * @extends Model
 *//**
 * chat_messages model
 * @extends Model
 */AccessUserModel=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,null,[{key:'tableName',/**
   * @override
   */get:function a(){return'access_users'}/**
   * @override
   */},{key:'jsonSchema',get:function a(){return{type:'object',required:['userName','email'],search:['userName','email'],properties:{id:{type:'integer'},userName:{type:'string'},email:{type:'string'},active:{type:'integer'},password:{type:'string'}}}}/**
   * @override
   */},{key:'relationMappings',get:function a(){return{}}}]),b}(Model),ChatMessageModel=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return _inherits(b,a),_createClass(b,null,[{key:'tableName',/**
   * @override
   */get:function a(){return'chat_messages'}/**
   * @override
   */},{key:'jsonSchema',get:function a(){return{type:'object',required:['senderId','receiverId','message'],search:['message'],properties:{id:{type:'integer'},senderId:{type:'integer'},receiverId:{type:'integer'},message:{type:'string'}}}}/**
   * @override
   */},{key:'relationMappings',get:function a(){return _defineProperty({accessUser:{relation:Model.BelongsToOneRelation,modelClass:AccessUserModel,join:{from:'chat_messages.senderId',to:'access_users.id'}}},'accessUser',{relation:Model.BelongsToOneRelation,modelClass:AccessUserModel,join:{from:'chat_messages.receiverId',to:'access_users.id'}})}}]),b}(Model),module.exports={AccessUserModel:AccessUserModel,ChatMessageModel:ChatMessageModel};
//# sourceMappingURL=access.js.map