angular.module("Lms")
    .service('UserService', function ($http, serverRef, $q, firebaseRef) {
        var vm = this;
        vm.userID = localStorage.getItem('userID');
        vm.getCurrentUser = function () {
            var deferred = $q.defer();
            var user = 564;
            $http.get(serverRef + '/account/currentUserData?userID=' + vm.userID).then(
                function (success) {
                    user = success.data.user;
                    console.log(user);
                    deferred.resolve(user);
                }, function (err) {
                    deferred.reject(err);
                }
            );
            return deferred.promise
        };
        vm.updateProfile = function (updateData) {
            $http.post(serverRef + '/account/updateInfo', updateData).then(
                function (success) {
                    success.data.code == 11000 ? toastr.info('Email is already in use!') : toastr.success('Profile Update Successfully');
                    console.log(success)
                },
                function (err) {
                    toastr.error('Failed!');
                    console.log(err)
                }
            )
        };
        vm.changePassword = function (updateData, userID) {
            updateData.userID = userID;
            $http.post(serverRef + '/account/changePassword', updateData).then(
                function (success) {
                    success.data.msg ? toastr.error("Invalid Current Password") : null;
                    success.data.nModified ? toastr.success("Password Successfully Updated") : null;
                    console.log(success)
                }, function (err) {
                    toastr.error("Failed!")
                }
            )
        };
        vm.setPassword = function (updateData, userID) {
            updateData.userID = userID;
            $http.post(serverRef + '/account/setPassword', updateData).then(
                function (success) {
                    //success.data.msg ? toastr.error("Invalid Current Password") : null;
                    success.data.nModified ? toastr.success("Password Successfully Save") : null;
                    console.log(success)
                }, function (err) {
                    toastr.error("Failed!")
                }
            )
        };
        vm.linkedAccount = function (provider, userID) {
            var ref = new Firebase(firebaseRef);
            ref.authWithOAuthPopup(provider, function (error, authData) {
                if (error) {
                    toastr.error('Authentication Failed!');
                }
                else {
                    var obj = {};
                    obj[provider + 'ID'] = authData[provider].id;
                    console.log(authData);
                    $http.post(serverRef + "/account/linkedAccount?userID=" + userID, obj).then(
                        function (success) {
                            console.log(success.data);
                            success.data.msg ? toastr.info('This Account Is Already Linked!') : toastr.success('Successfully Connected');
                        },
                        function (error) {
                            console.log(error);
                            toastr.error('Authentication Failed!');
                        }
                    );
                }
            })
        }
    });