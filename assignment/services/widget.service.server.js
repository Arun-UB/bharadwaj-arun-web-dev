'use strict';
module.exports = function (app) {
    var shortid = require('shortid');
    var fs = require('fs');
    var path = require('path');
    var atob = require('atob');

    var widgets = [
        {'_id': '123', 'widgetType': 'HEADER', 'pageId': '321', 'size': '2', 'text': 'GIZMODO'},
        {'_id': '234', 'widgetType': 'HEADER', 'pageId': '321', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
            'url': 'http://lorempixel.com/400/200/'
        },
        {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
        {'_id': '567', 'widgetType': 'HEADER', 'pageId': '321', 'size': '4', 'text': 'Lorem ipsum'},
        {
            '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
            'url': 'https://youtu.be/AM2Ivdi9c4E'
        },
        {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
    ];


    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/upload', uploadImage);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget._id = (new Date()).getTime() + '';
        widget.pageId = pageId;
        widgets.push(widget);
        return res.sendStatus(201);
    }

    function findAllWidgetsForPage(req, res) {
        var result = [];
        var pageId = req.params.pageId;
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                result.push(widgets[w]);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                return res.send(widgets[i]);
            }
            }
        res.status(404).send('Widget not found');
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
            return res.send(req.headers.origin + '/uploads/' + fName);
        });
    }
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w] = widget;
                return res.sendStatus(200);
            }
        }
        res.status(404).send('Widget not found');
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                return res.sendStatus(204);
            }
        }
        res.status(404).send('Widget not found');
        }
    }

