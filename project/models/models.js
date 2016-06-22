module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://admin:GW8XWk6vbhEZ@localhost/webdev';
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    mongoose.connect(connectionString);

    var models = {
        userModel: require('./user/user.model')(),
        postModel: require('./post/post.model')(),
        // pageModel: require('./page/page.model.server')(),
        // widgetModel: require('./widget/widget.model.server')()
    };
    return models;
};