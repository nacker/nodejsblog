"use strict";

exports.addComment = function (req, res, next) {
  // 添加评论：
  // 文章id req.params.articleId
  // 评论内容  req.body.content
  // 评论的作者  req.session.user.id
  // 评论时间    moment().format('YYYY-MM-DD HH:mm:ss')
  
  // 插入数据

    let id = req.params.articleId;
    let content = req.body.content;
    let uid = req.session.user.id;
    let time = moment().format('YYYY-MM-DD HH:mm:ss');


};
