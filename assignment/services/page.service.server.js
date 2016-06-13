module.exports = function (app, models) {

    var PageModel = models.pageModel;
    app.post('/assignment/api/website/:websiteId/page', createPage);
    app.get('/assignment/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/assignment/api/page/:pageId', findPageById);
    app.put('/assignment/api/page/:pageId', updatePage);
    app.delete('/assignment/api/page/:pageId', deletePage);
    app.put('/assignment/api/page/:pageId/updateWidgets', updateWidgets);
    app.get('/assignment/api/page/:pageId/widgetOrder', getWidgetOrder);
    app.put('/assignment/api/page/:pageId/widgetOrder', updateWidgetOrder);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        PageModel
            .createPage(websiteId, page)
            .then(function (page) {
                return res.status(201).send(page);
            }, function (error) {
                return res.status(400);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        PageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                return res.json(pages);
            }, function (error) {
                return res.sendStatus(404);
            });
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        PageModel
            .findPageById(id)
            .then(function (page) {
                return res.json(page);
            }, function (error) {
                return res.status(404).send('Page not found');
            });
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var page = req.body;
        PageModel
            .updatePage(id, page)
            .then(function (page) {
                return res.json(page);
            }, function () {
                return res.status(404).send('Page not found');
            });
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        PageModel
            .deletePage(id)
            .then(function () {
                return res.sendStatus(204);
            }, function () {
                return res.status(404).send('Page not found');
            });
    }

    function updateWidgets(req, res) {
        var id = req.params.pageId;
        var widgetId = req.body.widgetId;
        PageModel
            .updateWidgets(id, widgetId)
            .then(function () {
                return res.sendStatus(200);
            }, function (error) {
                return res.status(400).send('Unable to update widgets');
            });
    }

    function getWidgetOrder(req, res) {
        var id = req.params.pageId;
        PageModel
            .getWidgetOrder(id)
            .then(function (page) {
                return res.json(page);
            }, function () {
                return res.status(400).send('Unable to fetch order');
            });
    }

    function updateWidgetOrder(req, res) {
        var id = req.params.pageId;
        var widgetOrder = req.body;
        PageModel
            .updateWidgetOrder(id, widgetOrder)
            .then(function (widgetOrder) {
                return res.json(widgetOrder);
            }, function () {
                return res.status(400).send('Unable to update order');
            });
    }

};