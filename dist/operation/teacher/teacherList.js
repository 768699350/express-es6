'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _db = require('../../config/db.js');

var _db2 = _interopRequireDefault(_db);

var _util = require('../../config/util.js');

var _util2 = _interopRequireDefault(_util);

var _teacherSql = require('./teacherSql.js');

var _teacherSql2 = _interopRequireDefault(_teacherSql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//使用连接池
var pool = _mysql2.default.createPool(_util2.default.extend({}, _db2.default.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function jsonWrite(res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '100',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

exports.default = {
	//增加教师
	teacherAdd: function teacherAdd(req, res, next) {
		pool.getConnection(function (err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			var _id = _nodeUuid2.default.v1();
			// 建立连接，向表中插入值
			connection.query(_teacherSql2.default.teacherIns, [_id, param.name, param.grade, param.apply, param.subject], function (err, result) {
				if (result) {
					result = {
						code: 200,
						msg: '增加成功'
					};
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
				// 释放连接 
				connection.release();
			});
		});
	},
	//删除教师
	teacherDelete: function teacherDelete(req, res, next) {
		pool.getConnection(function (err, connection) {
			var _id = req.query._id;
			connection.query(_teacherSql2.default.teacherDel, _id, function (err, result) {
				console.log(result);
				if (result.affectedRows > 0) {
					result = {
						code: 200,
						msg: '删除成功'
					};
					jsonWrite(res, result);
				} else {
					jsonWrite(res, undefined);
				}
				connection.release();
			});
		});
	},
	//更新教师
	teacherUpdate: function teacherUpdate(req, res, next) {
		// 为了简单，要求同时传name和age两个参数
		pool.getConnection(function (err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			// 建立连接，向表中插入值
			connection.query(_teacherSql2.default.teacherUpd, [param.name, param.grade, param.apply, param.subject, param._id], function (err, result) {
				if (result) {
					result = {
						code: 200,
						msg: '修改成功'
					};
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	//获取所有教师
	teacherAll: function teacherAll(req, res, next) {
		pool.getConnection(function (err, connection) {
			var param = req.query || req.params;
			connection.query(_teacherSql2.default.teacherAll, [parseInt(param.count * (param.page - 1)), parseInt(param.count)], function (err, result) {
				var myResult = {
					code: 200,
					msg: '获取成功',
					data: result
				};
				jsonWrite(res, myResult);
				connection.release();
			});
		});
	},
	//获取教师信息数量
	teacherCount: function teacherCount(req, res, next) {
		pool.getConnection(function (err, connection) {
			connection.query(_teacherSql2.default.teacherCount, function (err, result) {
				var myResult = {
					code: 200,
					msg: '获取成功',
					data: result[0]['count(*)']
				};
				jsonWrite(res, myResult);
				connection.release();
			});
		});
	},
	//根据_id获取教师
	teacherById: function teacherById(req, res, next) {
		var _id = req.query._id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function (err, connection) {
			connection.query(_teacherSql2.default.teacherById, _id, function (err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
};