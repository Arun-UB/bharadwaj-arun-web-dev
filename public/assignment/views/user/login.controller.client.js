(function (){
    'use strict';
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

   

    function LoginController(UserService,$location) {
        //View Model
        var vm =this;
        vm.login = login;

        function login(username,password){
            UserService.findUserByCredentials(username, password)
                .then(function (user) {
                        var id = user._id;
                        vm.user = user;
                        $location.url('/profile/' + id);
                    },
                    function (err) {
                        vm.msg = {type: 'error', text: 'Username and password does not match.'};
                    });
        }
    }
})();