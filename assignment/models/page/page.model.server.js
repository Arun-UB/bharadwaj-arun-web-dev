module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();
    var Page = mongoose.model('Page', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        updateWidgets: updateWidgets,
        getWidgetOrder: getWidgetOrder,
        updateWidgetOrder: updateWidgetOrder
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(id) {
        return Page.findById({_id: id});
    }

    function updatePage(id, page) {
        return Page
            .update({_id: id}, {
                $set: {
                    name: page.name,
                    description: page.description
                }
            });
    }

    function deletePage(id) {
        return Page.remove({_id: id});
    }

    function updateWidgets(id, widgetId) {
        return Page
            .update({_id: id}, {
                $push: {
                    widgetsOrder: widgetId,
                    widgets: widgetId
                }
            });
    }

    function getWidgetOrder(id) {
        return Page
            .findById({_id: id});
    }

    function updateWidgetOrder(id, widgetsOrder) {
        return Page
            .update({_id: id}, {
                $set: {
                    widgetsOrder: widgetsOrder
                }
            });
    }
};