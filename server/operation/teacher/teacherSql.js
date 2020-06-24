const teacher={
	//增
	teacherIns: 'INSERT INTO `teacher` (`id`,`name`,`grade`,`apply`,`subject`) VALUES(?,?,?,?,?)',
	//删
	teacherDel: 'delete from `teacher` where `id`=?',
	//改
	teacherUpd:'UPDATE `teacher` SET `name`=?,`grade`=?,`apply`=?,`subject`=? WHERE `id`=?',
    //查 'select * from teacher'
    teacherAll: 'select * from `teacher` limit ?,?',
    //分页
    teacherCount: 'select count(*) from teacher',
    //查
    teacherById: 'select * from `teacher` where `id`=?'
}

export default teacher;