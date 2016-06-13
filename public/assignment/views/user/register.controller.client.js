    (function (){
        'use strict';
        angular
            .module('WebAppMaker')
            .controller('RegisterController', RegisterController);


        function RegisterController(UserService,$location) {
            //View Model
            var vm =this;


            vm.register = register;
            function checkPwd(p1,p2){
                return p1 === p2;
            }

            function register(user,form){

                if (form.$invalid) {
                    vm.msg = {type: 'error', text: 'Please correct the errors'};
                }
                else if (form.$valid && !checkPwd(user.password, user.confirmPassword)) {
                    vm.msg = {type: 'error', text: 'Passwords don\'t match.'};
                }
                else {
                UserService.createUser(user)
                    .then(function (id) {
                        $location.url('/profile/' + id);
                    }, function (err) {
                        vm.msg = {type: 'error', text: err.data};
                    });
                }
            }
        }

    })();
