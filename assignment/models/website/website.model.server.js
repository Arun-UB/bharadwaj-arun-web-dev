module.exports = function () {
    'use strict';
    var mongoose = require('mongoose')
    var WebsiteSchema = require('./website.schema.server')();
    var Website = mongoose.model('Website', WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findWebsitesForUserId: findWebsitesForUserId,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findWebsitesForUserId(userId) {
        return Website
            .find({_user: userId});
    }

    function findWebsiteById(id) {
        return Website
            .findById(id);
    }

    function updateWebsite(id, website) {
        return Website
            .update({_id: id}, {
                $set: {
                    name: website.name,
                    description: website.description
                }
            })
    }

    function deleteWebsite(id) {
        return Website.remove({_id: id});
    }
};