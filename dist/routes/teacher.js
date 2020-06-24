'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _teacherList = require('../operation/teacher/teacherList.js');

var _teacherList2 = _interopRequireDefault(_teacherList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//进入主页面信息

var login = function login(res) {
	res.json({
		code: 100,
		msg: '请重新登录！'
	});
};

router.get('/', function (req, res, next) {
	if (req.cookies.account) {
		res.render('index', { title: 'teacherList---api' });
	} else {
		login(res);
	}
});

//增
router.get('/teacherAdd', function (req, res, next) {
	if (req.cookies.account) {
		_teacherList2.default.teacherAdd(req, res, next);
	} else {
		login(res);
	}
});

//删
router.get('/teacherDel', function (req, res, next) {
	if (req.cookies.account) {
		_teacherList2.default.teacherDelete(req, res, next);
	} else {
		login(res);
	}
});

//改

router.get('/teacherUpdate', function (req, res, next) {
	if (req.cookies.account) {
		_teacherList2.default.teacherUpdate(req, res, next);
	} else {
		login(res);
	}
});

//查
router.get('/teacherAll', function (req, res, next) {
	if (req.cookies.account) {
		_teacherList2.default.teacherAll(req, res, next);
	} else {
		login(res);
	}
});

//分页
router.get('/teacherCount', function (req, res, next) {
	if (req.cookies.account) {
		_teacherList2.default.teacherCount(req, res, next);
	} else {
		login(res);
	}
});

//查
router.get('/teacherById', function (req, res, next) {
	if (req.cookies.account) {
		_teacherList2.default.teacherById(req, res, next);
	} else {
		login(res);
	}
});

exports.default = router;