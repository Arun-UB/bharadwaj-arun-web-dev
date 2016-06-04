module.exports = function (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        var newPage = {
            _id: (new Date()).getTime() + "",
            name: page.name,
            title: page.title,
            websiteId: websiteId
        };
        pages.push(newPage);
        res.status(201).send(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var result = [];
        var websiteId = req.params.websiteId;
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                result.push(pages[p]);
            }
        }
        res.send(result);
    }

    function findPageById(req, res) {
        var id = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id === id)
                return res.send(pages[p]);
        }
        res.status(404).send("Page with id:" + id + " not found");
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var page = req.body;
        for (var p in pages) {
            if (pages[p]._id == id) {
                pages[p].name = page.name;
                pages[p].title = page.title;
                return res.sendStatus(200);
            }
        }
        res.status(404).send("Page with id:" + id + " not found")
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id === id) {
                pages.splice(p, 1);
                return res.sendStatus(204);
            }
        }
        res.status(404).send("Page with id:" + id + " not found")
    }
}