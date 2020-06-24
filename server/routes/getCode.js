import express from 'express';
import https from 'https';
import fs from 'fs';

const router = express.Router();

/* 处理登录请求 */
router.get('/getCode', function(req, res, next) {
	let param = req.query || req.params;
	let appid = param.appid ? param.appid : 'wx3de62d49a788d303';
	let secret = param.secret ? param.secret : 'f93d3773b40246cc5db1e0aa8673a5a3';
	let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
	https.get(url,(e)=>{
		e.on('data', (a) => {
			let b = JSON.parse(''+a);
			let token = b.access_token;
			console.log(token);

			let data = JSON.stringify({
				'scene': param.scene,
				'width': '430px',
				// 'page': 'page/index/index',
				// 'is_hyaline': true
			});
			let options = {
				host: 'api.weixin.qq.com',
				path: '/wxa/getwxacodeunlimit?access_token=' + token,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': data.length
				}
			};
			let req2 = https.request(options, (e) => {
				e.setEncoding('binary');
				let imgData = '';
				e.on('data', (d) => {
					imgData += d;
				});
				e.on('end', function() {
					fs.writeFile('./public/images/code.png', imgData, 'binary', function(err) {
						if(err) {console.error(err);}
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
			req2.on('error', (e) => {
			  	console.error(e);
			});
			req2.write(data);
			req2.end();
		});
	}).on('error', (e) => {
  		console.error(e);
	});
});

export default router;
