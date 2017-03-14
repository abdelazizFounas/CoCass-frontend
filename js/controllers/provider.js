/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerProvider", function ($scope, $mdDialog, $http) {
  $scope.provider();

  $scope.mdDialogOpenned = 0;

  $scope.cpuUsed = 4;
  $scope.cpuTotal = 8;
  $scope.ramUsed = 4;
  $scope.ramTotal = 8;
  $scope.hddUsed = 4;
  $scope.hddTotal = 8;

  $scope.cpuValue = 50;
  $scope.ramValue = 50;
  $scope.hddValue = 50;

  $scope.services = [];

  $scope.insertDockerMachine = function(ev) {
    $mdDialog.show({
      controller: InsertDockerMachineController,
      scope: this,
      preserveScope: true,
      templateUrl: 'html/insert-docker-machine.html',
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
      templateUrl: 'html/delete-docker-machine.html',
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

  $scope.refreshUsersContainers = function() {
    $http({
      method: 'GET',
      url: '/Providers/services'
    }).then(function successCallback(response) {
      $scope.services = response.data.services;
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
      console.log("Error while calling the update services view function.");
    });
  };

  $scope.usersContainers = function(ev) {
    $scope.mdDialogOpenned = 1;

    $scope.refreshUsersContainers();

    $mdDialog.show({
      controller: UsersContainersController,
      scope: this,
      preserveScope: true,
      templateUrl: 'html/users-containers.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function UsersContainersController($scope, $mdDialog) {
    $scope.close = function() {
      $scope.mdDialogOpenned = 0;
      $mdDialog.hide();
    };
  }

  $scope.availableImages = function(ev) {
    $scope.mdDialogOpenned = 2;

    $mdDialog.show({
      controller: AvailableImagesController,
      scope: this,
      preserveScope: true,
      templateUrl: 'html/available-images.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function AvailableImagesController($scope, $mdDialog) {
    $scope.close = function() {
      $scope.mdDialogOpenned = 0;
      $mdDialog.hide();
    };
  }

  $scope.nodes = function(ev) {
    $scope.mdDialogOpenned = 3;

    $mdDialog.show({
      controller: NodesController,
      scope: this,
      preserveScope: true,
      templateUrl: 'html/nodes.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function NodesController($scope, $mdDialog) {
    $scope.close = function() {
      $scope.mdDialogOpenned = 0;
      $mdDialog.hide();
    };
  }
});
