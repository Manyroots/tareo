'use strict';

angular.module('tareoApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $location) {

    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.user = {};
    $scope.errors = {};
    /*
    * Login desde la pagina principal.
    */
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          //$location.path('/');
          $scope.isLoggedIn = true;
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
