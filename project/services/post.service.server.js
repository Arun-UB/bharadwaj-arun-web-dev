module.exports = function (app, models) {
    'use strict';
    var PostModel = models.postModel;
    var UserModel = models.userModel;

    app.post('/project/api/user/:userId/post', createPost);
    app.get('/project/api/user/:userId/post', findPostsForUser);
    app.get('/project/api/user/:userId/post/:postId', findPostById);
    app.put('/project/api/user/:userId/post/:postId/like', likePost);
    app.delete('/project/api/user/:userId/post/:postId', deletePost);

    function createPost(req, res) {
        var userId = req.params.userId;
        var post = req.body.newPost;
        post._user = userId;
        PostModel
            .createPost(post)
            .then(function (post) {
                return res.status(201).send(post);
            }, function (error) {
                return res.status(400).send(error);
            });
    }

    function findPostsForUser(req, res) {
        var userId = req.params.userId;
        PostModel
            .findPostsForUserId(userId)
            .then(function (posts) {
                return res.json(posts);
            }, function (error) {
                return res.status(400).send(error);
            });
    }

    function likePost(req, res) {
        var userId = req.params.userId;
        var postId = req.params.postId;
        var value = req.body.value;
        PostModel
            .likePost(userId, postId, value)
            .then(function () {
                return res.sendStatus(200);
            }, function () {
                return res.sendStatus(400);
            });
    }

    function findPostById(req, res) {
        var id = req.params.postId;
        PostModel
            .findPostById(id)
            .then(function (post) {
                return res.json(post);
            }, function (error) {
                return res.status(404).send(error);
            });
    }

    /*function updatepost(req, res) {
     var id = req.params.postId;
     var post = req.body;
     postModel
     .updatepost(id, post)
     .then(function (post) {
     return res.json(post);
     }, function (error) {
     return res.status(404).send(error);
     });
     }
     */
    function deletePost(req, res) {
        var id = req.params.postId;
        PostModel
            .deletePost(id)
            .then(function (post) {
                return post;
            }, function (error) {
                res.sendStatus(404).send(error);
            })
            .then(function (post) {
                if (post.result.n) {
                    return UserModel
                        .findUserById(req.user._id)
                        .then(function (user) {
                            user.posts.pull(id);
                            return user.save();
                        }, function (error) {
                            return res.status(400).send(error);
                        });
                }
            })
            .then(function (user) {
                return res.sendStatus(204);
            });
    }
};