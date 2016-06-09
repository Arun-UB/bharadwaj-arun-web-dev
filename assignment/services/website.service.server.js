module.exports = function (app, models) {
    'use strict';
    var WebsiteModel = models.websiteModel;
    // var websites = [
    //     {'_id': '123', 'name': 'Facebook', 'developerId': '456'},
    //     {'_id': '234', 'name': 'Tweeter', 'developerId': '456'},
    //     {'_id': '456', 'name': 'Gizmodo', 'developerId': '456'},
    //     {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123'},
    //     {'_id': '678', 'name': 'Checkers', 'developerId': '123'},
    //     {'_id': '789', 'name': 'Chess', 'developerId': '234'}
    // ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/user/:userId/website/:websiteId', findWebsiteById);
    app.put('/api/user/:userId/website/:websiteId', updateWebsite);
    app.delete('/api/user/:userId/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = {};
        website.name = req.body.name;
        website.description = req.body.description;
        WebsiteModel
            .createWebsite(userId, website)
            .then(function (website) {
                return res.status(201).send(website);
            }, function (error) {
                return res.status(400).send(error);
            })
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        WebsiteModel
            .findWebsitesForUserId(userId)
            .then(function (websites) {
                return res.json(websites);
            }, function (error) {
                return res.status(400).send(error);
            });
    }

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
            .then(function () {
                return res.sendStatus(204);
            }, function (error) {
                res.sendStatus(404).send(error);
            });
    }
};