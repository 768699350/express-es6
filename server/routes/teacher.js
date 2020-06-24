import express from 'express';
import teacherList from '../operation/teacher/teacherList.js';

const router = express.Router();

//进入主页面信息

const login = function (res) {
    res.json({
      code: 100,
      msg: '请重新登录！'
    });
};

router.get('/', function(req, res, next) {
	if(req.cookies.account) {
  		res.render('index', { title: 'teacherList---api'});
	} else {
    	login(res);
	}
});

//增
router.get('/teacherAdd',function(req,res,next){
	if(req.cookies.account) {
		  teacherList.teacherAdd(req,res,next);
	} else {
    	login(res);
	}
});

//删
router.get('/teacherDel',function(req,res,next){
	if(req.cookies.account) {
		  teacherList.teacherDelete(req,res,next);
	} else {
    	login(res);
	}
});

//改

router.get('/teacherUpdate',function(req,res,next){
	if(req.cookies.account) {
		  teacherList.teacherUpdate(req,res,next);
	} else {
    	login(res);
	}
});

//查
router.get('/teacherAll',function(req,res,next){
	if(req.cookies.account) {
		  teacherList.teacherAll(req,res,next);
	} else {
    	login(res);
	}
});

//分页
router.get('/teacherCount',function(req,res,next){
  if(req.cookies.account) {
      teacherList.teacherCount(req,res,next);
  } else {
    	login(res);
  }
});

//查
router.get('/teacherById',function(req,res,next){
	if(req.cookies.account) {
		  teacherList.teacherById(req,res,next);
	} else {
    	login(res);
	}
});

export default router;
