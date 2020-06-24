'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _md5Node = require('md5-node');

var _md5Node2 = _interopRequireDefault(_md5Node);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _util = require('../config/util.js');

var _util2 = _interopRequireDefault(_util);

var _db = require('../config/db.js');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var pool = _mysql2.default.createPool(_util2.default.extend({}, _db2.default.mysql));

/* 处理登录请求 */
router.post('/login', function (req, res) {
	pool.getConnection(function (err, connection) {
		//if (err) throw err;
		connection.query('select * from user where account = ?', [req.body.account], function (err, result) {
			//if (err) throw err;
			if (result.length !== 0 && result[0].password == (0, _md5Node2.default)(req.body.password)) {
				res.cookie('account', req.body.account, { maxAge: 86400000 });
				res.json({
					code: 200,
					msg: '登录成功！'
				});
			} else {
				res.json({
					code: 100,
					msg: '账号或密码有误！'
				});
			}
			connection.release();
		});
	});
});

// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://root:123456@localhost:27017/';

// postRouter.post('/login', function(req, res) {
//     MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
// 	    if (err) throw err;
// 	    let _db = db.db('wxdome');
// 	    let user = {'account': req.body.account};
// 	    _db.collection('user').findOne(user, function(err, result) {
// 	        if (err) throw err;
//         	if(result.password == req.body.password){
//         		res.cookie('account', req.body.account,{ maxAge: 86400000 });
// 				res.json({
// 					code: 200,
// 					msg: '登录成功！'
// 				});
//         	}else{
//         		res.json({
// 					code: 100,
// 					msg: '账号或密码有误！'
// 				});
//         	}
// 	        db.close();
// 	    });
// 	});
// })


exports.default = router;