(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .directive('profile',profile);
    
    function profile() {
        return{
            scope:{
                "id":"=id"
            },
            templateUrl:"../templates/profile.html"
        }
    }

})();