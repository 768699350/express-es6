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

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _util = require('../config/util.js');

var _util2 = _interopRequireDefault(_util);

var _db = require('../config/db.js');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var pool = _mysql2.default.createPool(_util2.default.extend({}, _db2.default.mysql));

/* 处理注册请求 */
router.post('/register', function (req, res) {
    if (req.body.account != '' && req.body.password != '' && req.body.phone != '' && req.body.email != '') {
        var password = (0, _md5Node2.default)(req.body.password);
        pool.getConnection(function (err, connection) {
            var _id = _nodeUuid2.default.v1();
            connection.query('INSERT INTO `user` (`id`,`account`,`password`,`phone`,`email`) VALUES(?,?,?,?,?)', [_id, req.body.account, password, req.body.phone, req.body.email], function (err, result) {
                if (result) {
                    res.json({
                        code: 200,
                        msg: '注册成功！'
                    });
                } else {
                    res.json({
                        code: 100,
                        msg: '注册失败！'
                    });
                }
                connection.release();
            });
        });
    } else {
        res.json({
            code: 100,
            msg: '用户名，密码，电话，邮箱都不能为空！'
        });
    }
});

exports.default = router;