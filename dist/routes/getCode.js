'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* 处理登录请求 */
router.get('/getCode', function (req, res, next) {
	var param = req.query || req.params;
	var appid = param.appid ? param.appid : 'wx3de62d49a788d303';
	var secret = param.secret ? param.secret : 'f93d3773b40246cc5db1e0aa8673a5a3';
	var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
	_https2.default.get(url, function (e) {
		e.on('data', function (a) {
			var b = JSON.parse('' + a);
			var token = b.access_token;
			console.log(token);

			var data = JSON.stringify({
				'scene': param.scene,
				'width': '430px'
				// 'page': 'page/index/index',
				// 'is_hyaline': true
			});
			var options = {
				host: 'api.weixin.qq.com',
				path: '/wxa/getwxacodeunlimit?access_token=' + token,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': data.length
				}
			};
			var req2 = _https2.default.request(options, function (e) {
				e.setEncoding('binary');
				var imgData = '';
				e.on('data', function (d) {
					imgData += d;
				});
				e.on('end', function () {
					_fs2.default.writeFile('./public/images/code.png', imgData, 'binary', function (err) {
						if (err) {
							console.error(err);
						}
						res.json({
							code: 200,
							appid: appid,
							secret: '',
							scene: param.scene,
							img: 'http://192.168.0.207:3001/images/code.png'
						});
					});
				});
			});
			req2.on('error', function (e) {
				console.error(e);
			});
			req2.write(data);
			req2.end();
		});
	}).on('error', function (e) {
		console.error(e);
	});
});

exports.default = router;