'use strict';
module.exports = function (app, models) {
    var shortid = require('shortid');
    var fs = require('fs');
    var path = require('path');
    var atob = require('atob');

    var WidgetModel = models.widgetModel;

    app.post('/assignment/api/page/:pageId/widget', createWidget);
    app.get('/assignment/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/assignment/api/widget/:widgetId', findWidgetById);
    app.post('/assignment/api/upload', uploadImage);
    app.put('/assignment/api/widget/:widgetId', updateWidget);
    app.delete('/assignment/api/widget/:widgetId', deleteWidget);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        WidgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                return res.status(201).send(widget);
            }, function (error) {
                console.log(error);
                return res.sendStatus(400);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                return res.json(widgets);
            }, function () {
                return res.status(404);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                return res.json(widget);
            }, function () {
                return res.status(404).send('Widget not found');
            });
    }

    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }

    function uploadImage(req, res) {
        var file = req.body;
        var imageBuffer = decodeBase64Image(file.content);
        var fName = shortid.generate() + path.extname(file.name);
        var fPath = path.resolve(__dirname, '../../public/assignment/uploads') + path.sep + fName;
        fs.writeFile(fPath, imageBuffer.data, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.send(req.headers.origin + "/assignment/uploads/" + fName);
        });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        delete widget._id;
        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                return res.json(widget);
            }, function (error) {
                console.log(error);
                return res.status(404).send('Widget not found');
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                return res.sendStatus(204);
            }, function () {
                return res.status(404).send('Widget not found');
            });
    }

};