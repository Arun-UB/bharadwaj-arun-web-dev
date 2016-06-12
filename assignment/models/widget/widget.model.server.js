module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var Widget = mongoose.model('Widget', WidgetSchema);

    var api = {
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        createWidget: createWidget,
        deleteWidget: deleteWidget
        // reorderWidget:reorderWidget
    };

    return api;

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(id) {
        return Widget.findById({_id: id});
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        var newWidget = Widget.create(widget);
        return newWidget;
    }

    function updateWidget(id, widget) {
        return Widget.update({_id: id}, widget);
    }

    function deleteWidget(id) {
        return Widget.remove({_id: id});
    }
};