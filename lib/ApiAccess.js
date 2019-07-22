"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_express=require("express"),_express2=_interopRequireDefault(_express),_socket=require("socket.io"),_socket2=_interopRequireDefault(_socket),_jsonwebtoken=require("jsonwebtoken"),_jsonwebtoken2=_interopRequireDefault(_jsonwebtoken),_package=require("../package.json"),_config=require("./config"),_controllers=require("./api/controllers"),_controllers2=_interopRequireDefault(_controllers),_routes=require("./api/routes"),_routes2=_interopRequireDefault(_routes);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var ApiAccess=function(){/**
   * 
   */function a(){_classCallCheck(this,a),this._app=(0,_express2.default)();var b=this._app;b.get("/",this.serviceVersion.bind(this)),b.use("/private",this.authMiddleware.bind(this),this.routesMapper(_routes2.default.private)),b.use(this.routesMapper(_routes2.default.public)),this.usersConnected=[]}/**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */return _createClass(a,[{key:"serviceVersion",value:function d(a,b){var c=this.version;b.json({version:c})}/**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */},{key:"authMiddleware",value:function g(a,b,c){var d=a.headers.token,f=this.auth(d);if(!f){var h=this.errors({code:401});return b.status(h.status).json(h),!1}a.auth=f,c()}/**
   * 
   * @param {*} routes 
   */},{key:"auth",value:function c(a){try{var b=_jsonwebtoken2.default.verify(a,_config.masterKey)}catch(a){return!1}return b}/**
   * 
   * @param {*} routes 
   */},{key:"routesMapper",value:function d(a){var b=(0,_express2.default)(),c=this;return a.forEach(function(a){var d=a.path,e=a.method,f=a.controller,g=a.task;b[e.toLowerCase()](d,async function(a,b){var d=new _controllers2.default[f],h=c.normalize(a);try{var i=await d[g](h)}catch(a){var k=c.errors(a);return b.status(k.status).json(k)}var j=c.done(i);return b.json(j)})}),b}/**
   * 
   * @param {*} error 
   */},{key:"errors",value:function e(a){var b=a.code,c=void 0===b?0:b;delete a.code;var d={error:!0,status:500,code:c,description:a};switch(c){case 403:d.status=403,d.description="forbiden";case 401:d.status=401,d.description="unauthorized";default:}return console.error(a),d}/**
   * 
   * @param {*} data 
   */},{key:"done",value:function b(a){// Use this method to normalize done response
return a}/**
   * 
   * @param {*} req 
   */},{key:"normalize",value:function b(a){// TODO: flatten query
return _extends({auth:a.auth},a.body||{},a.params||{},a.query||{})}/**
   * 
   */},{key:"chatInit",/**
   * 
   * @param {*} server 
   */value:function d(a){var b=this,c=(0,_socket2.default)(a);c.on("connection",function(a){//console.log(socket.id);
var c=a.handshake.query.token,d=b.auth(c);if(!d)return a.emit("rejected"),!1;var e=b.usersConnected.filter(function(a){return a.id==d.id});e.length?e[0].sockets.push(a):(d.sockets=[a],b.usersConnected.push(d)),a.emit("auth",{done:!0});var f=new _controllers2.default.MessageController;a.on("newMessage",async function(c){var d=await f.set(c),e=b.usersConnected.filter(function(a){return a.id==c.receiverId});e.length&&e[0].sockets.forEach(function(a){a.emit("newMessageReceived",d)});var g=b.usersConnected.filter(function(a){return a.id==c.senderId});g[0].sockets.forEach(function(b){b.id!=a.id&&b.emit("newMessageReceived",d)})})})}/**
   * 
   */},{key:"app",get:function a(){return this._app}},{key:"version",get:function a(){return _package.version}}]),a}();exports.default=ApiAccess,module.exports=exports.default,module.exports.default=exports.default;
//# sourceMappingURL=ApiAccess.js.map