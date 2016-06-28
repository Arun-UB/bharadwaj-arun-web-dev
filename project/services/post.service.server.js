module.exports = function (app, models) {
    'use strict';
    var PostModel = models.postModel;
    var UserModel = models.userModel;

    app.post('/project/api/user/:userId/post', createPost);
    app.get('/project/api/user/:userId/post', findPostsForUser);
    app.get('/project/api/post/search/:query', searchPosts);
    app.get('/project/api/user/:userId/post/:postId', findPostById);
    app.put('/project/api/user/:userId/post/:postId', updatePost);
    app.get('/project/api/user/:userId/posts', getUserPosts);
    app.get('/project/api/posts', getPosts);
    app.put('/project/api/user/:userId/post/:postId/like', likePost);
    app.delete('/project/api/user/:userId/post/:postId', deletePost);

    function createPost(req, res) {
        var userId = req.params.userId;
        var post = req.body.newPost;
        var newPost = {};
        post._user = userId;
        PostModel
            .createPost(post)
            .then(function (post) {
                newPost = post;
                return post;
            }, function (error) {
                return res.status(400).send(error);
            })
            .then(function (post) {
                if (post) {
                    UserModel
                        .findUserById(userId)
                        .then(function (user) {
                            user.posts.push(post._id);
                            return user.save();
                        }, function (error) {
                            return res.status(400).send(error);
                        });
                }
            })
            .then(function () {
                return res.status(201).send(newPost);
            });
    }

    function findPostsForUser(req, res) {
        var userId = req.params.userId;
        var uList = req.user.following;
        uList.push(userId);
        PostModel
            .findPostsForUserId(uList)
            .then(function (posts) {
                return res.json(posts);
            }, function (error) {
                return res.status(400).send(error);
            });
    }

    function getUserPosts(req, res) {
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
            .then(function (post) {
                return res.status(200).send(post);
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

    function updatePost(req, res) {
        var id = req.params.postId;
        var post = req.body;

        PostModel
            .updatePost(id, post)
            .then(function (post) {
                return res.json(post);
            }, function (error) {
                return res.status(404).send(error);
            });
    }


    function searchPosts(req, res) {
        var query = req.params.query;
        PostModel
            .searchPosts(query)
            .then(function (users) {
                return res.json(users);
            }, function () {
                return res.sendStatus(200);
            });
    }

    function getPosts(req, res) {
        PostModel
            .getPosts()
            .then(function (posts) {
                return res.json(posts);
            }, function () {
                return res.sendStatus(200);
            });
    }

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