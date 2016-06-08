module.exports = function (app) {
    'use strict';
    var websites = [
        {'_id': '123', 'name': 'Facebook', 'developerId': '456'},
        {'_id': '234', 'name': 'Tweeter', 'developerId': '456'},
        {'_id': '456', 'name': 'Gizmodo', 'developerId': '456'},
        {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123'},
        {'_id': '678', 'name': 'Checkers', 'developerId': '123'},
        {'_id': '789', 'name': 'Chess', 'developerId': '234'}
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/user/:userId/website/:websiteId', findWebsiteById);
    app.put('/api/user/:userId/website/:websiteId', updateWebsite);
    app.delete('/api/user/:userId/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var name = req.body.name;
        var description = req.body.description;
        var newWebsite = {
            _id: (new Date()).getTime() + '',
            name: name,
            description: description,
            developerId: userId
        };
        websites.push(newWebsite);
        res.status(201).send(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var result = [];
        var userId = req.params.userId;
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                result.push(websites[w]);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var id = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === id) {
                return res.send(websites[w]);
            }
        }
        res.status(404).send('Website with id:' + id + ' not found');
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var website = req.body;
        for (var w in websites) {
            if (websites[w]._id == id) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                return res.sendStatus(200);
            }
        }
        res.status(404).send('Website with id:' + id + ' not found');
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === id) {
                websites.splice(i, 1);
                return res.sendStatus(204);
            }
        }
        res.status(404).send('Website with id:' + id + ' not found');
    }

};