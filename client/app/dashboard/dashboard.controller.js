'use strict';

angular.module('tareoApp')
  .controller('DashboardCtrl', function ($scope,$http,$modal) {

    /*
    * Initialize controller
    */

    $scope.isEditing = false;
    $scope.results = [];

    $http.get('/api/things').success(function(data,status, headers, config){

      if(status === 200){

          $scope.things = [];

          angular.forEach(data, function(thing, key) {
            thing.isEditing = false;
            $scope.things.push(thing);
          });
      }

    }).
    error(function(data,status, headers, config){
      console.log('error: ',data);
    });

    /*
    * Methods
    */

    $scope.edit = function(itemIndex){
      $scope.things[itemIndex].isEditing ?  $scope.things[itemIndex].isEditing = false : $scope.things[itemIndex].isEditing = true;
    };

    $scope.saveEdit = function(itemIndex, name, info){
      $scope.things[itemIndex].name = name;
      $scope.things[itemIndex].info = info;
      $scope.things[itemIndex].isEditing = false;
    };


    $scope.remove = function(itemIndex){
      console.log('elemento a borrar: ',$scope.things[itemIndex]._id);
    };

    $scope.hide = function(itemIndex){
      console.log('elemento a esconder: ',$scope.things[itemIndex]._id);
    };

  });
