module.exports = function (app, models) {

    var PageModel = models.pageModel;
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

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
};