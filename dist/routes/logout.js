'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*退出登录*/
router.get('/logout', function (req, res, next) {
	res.clearCookie('account');
	res.json({
		code: 200,
		msg: '退出成功！'
	});
});

exports.default = router;