# Host: localhost  (Version: 5.5.53)
# Date: 2018-09-14 14:12:44
# Generator: MySQL-Front 5.3  (Build 4.234)

# 40101 SET NAMES utf8

# Structure for table "subject"

CREATE TABLE `subject` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "subject"
#

REPLACE INTO `subject` VALUES ('1','吉他'),('2','贝斯'),('3','葫芦丝');

#
# Structure for table "teacher"
#

CREATE TABLE `teacher` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `grade` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `apply` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "teacher"
#

REPLACE INTO `teacher` VALUES ('533b1960-b585-11e8-af71-5d3b7edd9f79','杜甫','二级教师','葫芦丝',233),('8dd18640-b4d6-11e8-85f0-7fb497c0b996','李白','一级教师','葫芦丝',266),('8e1fa640-b4d6-11e8-85f0-7fb497c0b996','王二','一级教师','吉他',277),('8e5fbc80-b4d6-11e8-85f0-7fb497c0b996','李广','二级教师','吉他',288),('8f25a490-b4d6-11e8-85f0-7fb497c0b996','吴广','一级教师','吉他',288),('909c2280-b4d7-11e8-85f0-7fb497c0b996','张广','一级教师','吉他',288),('914d7120-b4d7-11e8-85f0-7fb497c0b996','黄广','一级教师','吉他',288),('91b385f0-b4d7-11e8-85f0-7fb497c0b996','王广','一级教师','吉他',288),('b54f2d70-b4dc-11e8-814e-898b6afd7a44','赵广','一级教师','吉他',288);

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `account` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `phone` bigint(20) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

REPLACE INTO `user` VALUES ('8a55e3e0-b7d2-11e8-90f3-1bb1f0aaada1','admin','e10adc3949ba59abbe56e057f20f883e',13410098195,'768699350@qq.com');
