import mysql from 'mysql';
import uuid from 'node-uuid';

import $db from '../../config/db.js';
import $util from '../../config/util.js';
import $sql from './teacherSql.js';
//使用连接池
const pool = mysql.createPool($util.extend({}, $db.mysql));

// 向前台返回JSON方法的简单封装
const jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'100',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

export default {
	//增加教师
	teacherAdd: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			let param = req.query || req.params;
			let _id = uuid.v1();
			// 建立连接，向表中插入值
			connection.query($sql.teacherIns, [_id, param.name, param.grade, param.apply, param.subject], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
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
    teacherDelete: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            let _id = req.query._id;
            connection.query($sql.teacherDel, _id, function(err, result) {
            	console.log(result)
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                    jsonWrite(res, result);
                }else {
                    jsonWrite(res, undefined);
				}
                connection.release();
            });
        });
    },
	//更新教师
    teacherUpdate: function (req, res, next) {
        // 为了简单，要求同时传name和age两个参数
        pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			// 建立连接，向表中插入值
			connection.query($sql.teacherUpd, [param.name, param.grade, param.apply, param.subject, param._id], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'修改成功'
					};    
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
    },
	//获取所有教师
	teacherAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
        	var param = req.query || req.params;
            connection.query($sql.teacherAll, [parseInt(param.count * (param.page - 1)), parseInt(param.count)], function(err, result) {
            	let myResult = {
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
    teacherCount: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.teacherCount, function(err, result) {
            	let myResult = {
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
    teacherById: function (req, res, next) {
        let _id = req.query._id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.teacherById, _id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
};