module.exports = function (app, models) {
    'use strict';
    var WebsiteModel = models.websiteModel;

    app.post('/assignment/api/user/:userId/website', createWebsite);
    app.get('/assignment/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/assignment/api/user/:userId/website/:websiteId', findWebsiteById);
    app.put('/assignment/api/user/:userId/website/:websiteId', updateWebsite);
    app.delete('/assignment/api/user/:userId/website/:websiteId', deleteWebsite);

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
            });
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