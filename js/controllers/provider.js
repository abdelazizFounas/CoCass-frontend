/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerProvider", function ($scope, $mdDialog) {
  $scope.provider();

  $scope.insertDockerMachine = function(ev) {
    $mdDialog.show({
      controller: InsertDockerMachineController,
      scope: this,
      preserveScope: true,
      templateUrl: 'insert-docker-machine.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function InsertDockerMachineController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }

  $scope.deleteDockerMachine = function(ev) {
    $mdDialog.show({
      controller: DeleteDockerMachineController,
      scope: this,
      preserveScope: true,
      templateUrl: 'delete-docker-machine.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function DeleteDockerMachineController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }

  $scope.usersContainers = function(ev) {
    $mdDialog.show({
      controller: UsersContainersController,
      scope: this,
      preserveScope: true,
      templateUrl: 'users-containers.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function UsersContainersController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }

  $scope.availableImages = function(ev) {
    $mdDialog.show({
      controller: AvailableImagesController,
      scope: this,
      preserveScope: true,
      templateUrl: 'available-images.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function AvailableImagesController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }

  $scope.nodes = function(ev) {
    $mdDialog.show({
      controller: NodesController,
      scope: this,
      preserveScope: true,
      templateUrl: 'nodes.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function NodesController($scope, $mdDialog) {
    $scope.close = function() {
      $mdDialog.hide();
    };
  }
});
