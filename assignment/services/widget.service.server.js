'use strict';
module.exports = function (app, models) {
    var shortid = require('shortid');
    var fs = require('fs');
    var path = require('path');
    var atob = require('atob');

    var WidgetModel = models.widgetModel;
    // var widgets = [
    //     {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': '2', 'text': 'GIZMODO'},
    //     {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': '4', 'text': 'Lorem ipsum'},
    //     {
    //         '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
    //         'url': 'http://lorempixel.com/400/200/'
    //     },
    //     {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    //     {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': '4', 'text': 'Lorem ipsum'},
    //     {
    //         '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
    //         'url': 'https://youtu.be/AM2Ivdi9c4E'
    //     },
    //     {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
    // ];
    //

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/upload', uploadImage);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

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
            return res.send(req.HEADINGs.origin + '/uploads/' + fName);
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