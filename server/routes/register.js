import express from 'express';
import md5 from 'md5-node';
import mysql from 'mysql';
import uuid from 'node-uuid';
import $util from '../config/util.js';
import $db from '../config/db.js';

const router = express.Router();
const pool  = mysql.createPool($util.extend({}, $db.mysql));

/* 处理注册请求 */
router.post('/register', function(req, res) {
    if(req.body.account != '' && req.body.password != '' && req.body.phone != '' && req.body.email != ''){
        const password = md5(req.body.password)
        pool.getConnection(function(err, connection) {
            let _id = uuid.v1();
            connection.query('INSERT INTO `user` (`id`,`account`,`password`,`phone`,`email`) VALUES(?,?,?,?,?)', [_id, req.body.account, password, req.body.phone, req.body.email], function(err, result) {
                if (result) {
                    res.json({
                        code: 200,
                        msg: '注册成功！'
                    });
                }else {
                    res.json({
                        code: 100,
                        msg: '注册失败！'
                    });
                }
                connection.release();
            });
        });
    }else {
        res.json({
            code: 100,
            msg: '用户名，密码，电话，邮箱都不能为空！'
        });
    }
})

export default router;
