import express from 'express';
import md5 from 'md5-node';
import mysql from 'mysql';
import $util from '../config/util.js';
import $db from '../config/db.js';

const router = express.Router();
const pool  = mysql.createPool($util.extend({}, $db.mysql));

/* 处理登录请求 */
router.post('/login', function(req, res) {
	pool.getConnection(function(err, connection) {
		//if (err) throw err;
        connection.query('select * from user where account = ?', [req.body.account], function(err, result) {
        	//if (err) throw err;
		    if (result.length !== 0 && result[0].password == md5(req.body.password)) {
		        res.cookie('account', req.body.account,{ maxAge: 86400000 });
				res.json({
					code: 200,
					msg: '登录成功！'
				});
		  	}else {
		  		res.json({
					code: 100,
					msg: '账号或密码有误！'
				});
		  	}
            connection.release();
        });
    });
})

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


export default router;
