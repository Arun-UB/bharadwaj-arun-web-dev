(function () {
    'use strict';
    angular
        .module('Musix')
        .controller('AddUserController', AddUserController);


    function AddUserController(UserService, $location) {
        //View Model
        var vm = this;
        vm.addUser = addUser;
        function checkPwd(p1, p2) {
            return p1 === p2;
        }

        function addUser(user, form) {

            if (form.$invalid) {
                vm.msg = {type: 'error', text: 'Please correct the errors'};
            }
            else if (form.$valid && !checkPwd(user.password, user.confirmPassword)) {
                vm.msg = {type: 'error', text: 'Passwords don\'t match.'};
            }
            else {
                UserService
                    .createUser(user)
                    .then(function (user) {
                        if (user) {
                            $location.url('/admin');
                        }

                    }, function (err) {
                        vm.msg = {type: 'error', text: 'Username taken'};
                    });
            }
        }
    }

})();
