(function (){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);



    function ProfileController(UserService,$location,$routeParams) {

        //View Model
        var vm =this;
        var id = $routeParams.id;
        vm.errorMsg = null;
        vm.msg = null;
        vm.updateUser = updateUser;

        function init(){
            var user = UserService.findUserById(id);
            if(user){
                vm.user = user;
            }
            else{
                vm.errorMsg = "User not found";
            }
        }
        init();

        function updateUser(user) {
            console.log(user);
            if(UserService.updateUser(user._id,user)){
                vm.msg = "Profile saved";
            }
            else{
                vm.errorMsg = "Unable to save changes";
            }
        }
    }

})();
