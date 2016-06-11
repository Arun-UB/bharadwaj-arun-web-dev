module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://admin:GW8XWk6vbhEZ@localhost/webdev');

    var models = {
        userModel: require('./user/user.model.server')(),
        websiteModel: require('./website/website.model.server')(),
        pageModel: require('./page/page.model.server')(),
        widgetModel: require('./widget/widget.model.server')()
    };
    return models;
};