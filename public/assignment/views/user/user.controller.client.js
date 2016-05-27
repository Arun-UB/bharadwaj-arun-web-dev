(function (){
    "use strict";
    angular
        .module("app.user")
        .controller("LoginController",LoginController);

   

    function LoginController(UserService,$location) {
        //View Model
        var vm =this;

        vm.login = login;

        function login(username,password){
            var user = UserService.findUserByCredentials(username,password);
                if(user){
                    var id = user._id;
                    $location.url("/profile/" + id);
                }
                else{
                    vm.errorMsg = "Wrong login credentials!";
                }
        }
    }

})();