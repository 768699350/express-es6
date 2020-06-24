import express from 'express';
const router = express.Router();

/*退出登录*/
router.get('/logout', function(req, res, next) {
	res.clearCookie('account');
	res.json({
		code: 200,
		msg: '退出成功！'
	});
});

export default router;
