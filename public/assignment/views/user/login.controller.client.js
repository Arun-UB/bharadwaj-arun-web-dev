(function (){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);

   

    function LoginController(UserService,$location) {
        //View Model
        var vm =this;

        vm.login = login;

        function login(username,password){
            var user = UserService.findUserByCredentials(username,password);
            if(user){
                var id = user._id;
                vm.user = user;
                $location.url("/profile/" + id);
            }
            else{
                vm.errorMsg = "Wrong login credentials!";
            }
        }
    }

})();