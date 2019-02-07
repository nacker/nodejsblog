"use strict";

var Article = require('../models/article');

exports.showIndex = function (req, res, next) {

  Article.getAllCount(function (err, count) {
    let pageSize = req.app.locals.config.pageSize;
    console.log(count);
    let totalPage = Math.ceil(parseInt(count) / pageSize);
    console.log(totalPage);
    res.render('index', {
      user: req.session.user,
      totalPage: totalPage
    });
  });
};
