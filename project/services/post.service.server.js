module.exports = function (app, models) {
    'use strict';
    var PostModel = models.postModel;

    app.post('/project/api/user/:userId/post', createPost);
    app.get('/project/api/user/:userId/post', findPostsForUser);
    // app.get('/project/api/user/:userId/website/:websiteId', findWebsiteById);
    // app.put('/project/api/user/:userId/website/:websiteId', updateWebsite);
    // app.delete('/project/api/user/:userId/website/:websiteId', deleteWebsite);

    function createPost(req, res) {
        var userId = req.params.userId;
        var post = req.body.post;
        post._user = userId;
        PostModel
            .createPost(post)
            .then(function (post) {
                return res.sendStatus(201);
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

    /*
     function findWebsiteById(req, res) {
     var id = req.params.websiteId;
     WebsiteModel
     .findWebsiteById(id)
     .then(function (website) {
     return res.json(website);
     }, function (error) {
     return res.status(404).send(error);
     });
     }

     function updateWebsite(req, res) {
     var id = req.params.websiteId;
     var website = req.body;
     WebsiteModel
     .updateWebsite(id, website)
     .then(function (website) {
     return res.json(website);
     }, function (error) {
     return res.status(404).send(error);
     });
     }

     function deleteWebsite(req, res) {
     var id = req.params.websiteId;
     WebsiteModel
     .deleteWebsite(id)
     .then(function (website) {
     return website;
     }, function (error) {
     res.sendStatus(404).send(error);
     })
     .then(function (website) {
     if (website.result.n) {
     return UserModel
     .findUserById(req.user._id)
     .then(function (user) {
     user.websites.pull(id);
     return user.save();
     }, function (error) {
     return res.status(400).send(error);
     });
     }
     })
     .then(function (user) {
     return res.sendStatus(204);
     });
     }*/
};