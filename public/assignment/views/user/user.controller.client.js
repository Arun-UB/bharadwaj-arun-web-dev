(function (){
    "use strict";
    angular
        .module("app.user")
        .controller("LoginController",LoginController);

   

    function LoginController(UserService) {
        //View Model
        var vm =this;

        vm.login = login;

        function login(username,password){
            var user = UserService.findUserByCredentials(username,password);
            console.log(user);
                if(user){
                    console.log("Success");
                    console.log(user);
                }
                else{
                    vm.errorMsg = "Wrong login credentials!";
                    console.log("error");
                }
        }
    }

})();