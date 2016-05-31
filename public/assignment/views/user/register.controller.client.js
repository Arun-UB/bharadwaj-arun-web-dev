    (function (){
        "use strict";
        angular
            .module("WebAppMaker")
            // .directive("compareTo",compareTo)
            .controller("RegisterController",RegisterController);

        //
        // function compareTo() {
        //     return {
        //         require: "ngModel",
        //         scope: {
        //             otherModelValue: "=compareTo"
        //         },
        //         link: function(scope, element, attributes, ngModel) {
        //
        //             ngModel.$validators.compareTo = function(modelValue) {
        //                 return modelValue == scope.otherModelValue;
        //             };
        //
        //             scope.$watch("otherModelValue", function() {
        //                 ngModel.$validate();
        //             });
        //         }
        //     };
        // }

        function RegisterController(UserService,$location) {
            //View Model
            var vm =this;


            vm.register = register;
            function checkPwd(p1,p2){
                if(p1 === p2)
                    return true;
                else
                    return false;
            }
            function clearMsgs() {
                vm.msg = null;
                vm.errorMsg = null;
            }
            function register(user,form){
                console.log(user);
                console.log(form);
                clearMsgs();
                if(form.$valid && !checkPwd(user.password,user.confirmPassword)) {
                    vm.errorMsg = "Passwords doesn't match";
                }
                else if(form.$valid ){
                var id = UserService.createUser(user);
                    $location.url("/profile/" + id);

                }
                else{
                    vm.errorMsg = "Error in creating the user";
                }
            }
        }

    })();
