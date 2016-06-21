(function () {
    'use strict';
    angular
        .module('Musix')
        .controller('PlayListController', PlayListController);

    function PlayListController() {
        var vm = this;
        vm.theBestVideo = 'sMKoNBRZM1M';
    }
})();