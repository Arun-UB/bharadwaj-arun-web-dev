module.exports = function (app, models) {
    'use strict';
    var CommentModel = models.commentModel;
    var PostModel = models.postModel;

    app.post('/project/api/user/:userId/post/:postId/comment', createComment);
    app.get('/project/api/user/:userId/post/:postId/comment', findCommentsForPost);
    app.get('/project/api/user/:userId/post/:postId/comment/:cId', findCommentById);
    app.put('/project/api/user/:userId/post/:postId/comment/:cId', updateComment);
    app.delete('/project/api/user/:userId/post/:postId/comment/:cId', deleteComment);

    function createComment(req, res) {
        var userId = req.params.userId;
        var postId = req.params.postId;
        var comment = req.body.comment;
        var newComment;
        comment._user = userId;
        comment._post = postId;

        CommentModel
            .createComment(comment)
            .then(function (comment) {
                return comment
                return res.status(201).send(post);
            }, function (error) {
                return res.status(400).send(error);
            }).then(function (comment) {
            newComment = comment;
            if (comment) {
                PostModel
                    .findPostById(postId)
                    .then(function (post) {
                        post.comments.push(comment._id);
                        return post.save();
                    }, function (error) {
                        return res.status(400).send(error);
                    });
            }
        }).then(function (user) {
            return res.status(201).send(newComment);
        });
    }

    function findCommentsForPost(req, res) {
        var userId = req.params.userId;
        var postId = req.params.postId;
        CommentModel
            .findCommentsForPost(postId)
            .then(function (comments) {
                return res.json(comments);
            }, function (error) {
                return res.status(400).send(error);
            });
    }


    function findCommentById(req, res) {
        var id = req.params.cId;
        CommentModel
            .findCommentById(id)
            .then(function (comment) {
                return res.json(comment);
            }, function (error) {
                return res.status(404).send(error);
            });
    }

    function updateComment(req, res) {
        var id = req.params.cId;
        var comment = req.body;
        CommentModel
            .updateComment(id, comment)
            .then(function () {
                return res.sendStatus(200);
            }, function (error) {
                return res.status(404).send(error);
            });
    }

    function deleteComment(req, res) {
        var id = req.params.cId;
        CommentModel
            .deleteComment(id)
            .then(function () {
                return res.sendStatus(204);
            }, function (error) {
                res.sendStatus(404).send(error);
            });

    }
};