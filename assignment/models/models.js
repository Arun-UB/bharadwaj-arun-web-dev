module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require('./user/user.model.server')()
        // TODO: add all the toher models: websiteModel, pageModel, widgetModel
    };
    return models;
};