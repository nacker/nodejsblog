"use strict";

var path = require('path');

module.exports = {
    debug: true,
    secret:'nodejsblog',
    pageSize:5,
    uploadDir: path.join(__dirname,'uploads'),
    avatarDir: path.join(__dirname,'uploads/avatar')
};
