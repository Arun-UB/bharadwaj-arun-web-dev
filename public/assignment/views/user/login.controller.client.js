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
            if (username && password) {
                UserService.login(username, password)
                    .then(function (user) {
                        var id = user._id;
                        vm.user = user;
                        $location.url('/profile/');
                    }).catch(function (err) {
                    console.log(err);
                    vm.msg = {type: 'error', text: 'Username and password don\'t match.'};
                });
            }
            else {
                vm.msg = {type: 'error', text: 'Please correct the errors'};
            }

        }
    }
})();