module.exports = function (app) {

    var models = require('./models/models.js')();


    require('./services/user.service.server.js')(app, models);
    require('./services/post.service.server')(app, models);
    require('./services/comment.service.server')(app, models);
    // require('./services/playlist.service.server')(app, models);


};