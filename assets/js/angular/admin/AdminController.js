/**
 * Created by sparchuri on 9/30/2014.
 */
var adminApp = angular.module('AdminApp');

adminApp.controller('adminController',['$scope', '$sce', 'AdminAppManager' , '$window',
  function ($scope, $sce, adminAppManager, $window ) {
  $scope.manager = adminAppManager;
  $scope.productsTitle = 'It is Product Title';

  $scope.init = function() {

  };

  $scope.getProducts = function() {
    $scope.manager.getProducts();
  }
}]);
