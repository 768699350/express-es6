'use strict';

import teacher from './teacher';
import login from './login';
import register from './register';
import logout from './logout';
import getCode from './getCode';

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('', teacher);
	app.use('', login);
	app.use('', register);
	app.use('', logout);
	app.use('', getCode);
}