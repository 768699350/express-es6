'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _teacher = require('./teacher');

var _teacher2 = _interopRequireDefault(_teacher);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

var _logout = require('./logout');

var _logout2 = _interopRequireDefault(_logout);

var _getCode = require('./getCode');

var _getCode2 = _interopRequireDefault(_getCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('', _teacher2.default);
	app.use('', _login2.default);
	app.use('', _register2.default);
	app.use('', _logout2.default);
	app.use('', _getCode2.default);
};