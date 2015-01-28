'use strict';

angular.module('tareoApp')
  .controller('DashboardCtrl', function ($scope,$http,$modal) {

    /*
    * Initialize controller
    */
    $scope.isCollapsed = true;
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

    // create method
    $scope.create = function(name,info,active){

      var data = {
        name : name,
        info : info,
        active : active
      };

      $http.post('/api/things', data).success(function(data,status,headers,config){

        if(status === 201){

            $scope.things.push(data);
            $scope.isCollapsed = false;
        }

      }).error(function(err,status, headers, config){
        console.log(err);
      });

    };

    $scope.edit = function(itemIndex){
      $scope.things[itemIndex].isEditing ?  $scope.things[itemIndex].isEditing = false : $scope.things[itemIndex].isEditing = true;
    };

    $scope.saveEdit = function(itemIndex, name, info, active){


      var currentEl = $scope.things[itemIndex],
          url = '/api/things/'+currentEl._id;

      var data = {
        name : name,
        info : info,
        active : active
      };

      $http.put(url, data).success(function(data,status,headers,config){

        if(status === 200){

            $scope.things[itemIndex] = data;

            $scope.things[itemIndex].isEditing = false;
        }

      }).error(function(err,status, headers, config){
        console.log(err);
      });
    };


    $scope.remove = function(itemIndex){

      var url = '/api/things/'+$scope.things[itemIndex]._id;

      $http.delete(url).success(function(data,status, headers, config){

        if(status === 204){

          $scope.things.splice(itemIndex,1);

        }else{
          alert("error al borrar");
        }

      }).
      error(function(data,status, headers, config){
        console.log('error: ',data);
      });
    };

    $scope.hide = function(itemIndex){
      console.log('elemento a esconder: ',$scope.things[itemIndex]._id);
    };

  });
