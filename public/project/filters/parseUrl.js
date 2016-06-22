(function () {
    'use strict';
    angular
        .module('Musix')
        .filter('parseUrl', parseUrl)
        .filter('replaceUrl', replaceUrl);
    function parseUrl($sce) {

        return function (text) {
            var source = (text || '').toString();
            var urlArray = [];
            var url;
            var matchArray;

            // Regular expression to find FTP, HTTP(S)
            var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g;

            // Iterate through any URLs in the text.
            while ((matchArray = regexToken.exec(source)) !== null) {
                var token = matchArray[0];
                urlArray.push(token);
            }

            return urlArray;

        };
    }

    function replaceUrl() {
        return function (text) {
            var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g;
            return text.replace(regexToken, '');
        };
    }
})();