/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerProvider", function ($scope, $mdDialog, $http) {
  $scope.provider();

  $scope.cpuUsed = 0;
  $scope.cpuTotal = 0;
  $scope.ramUsed = 0;
  $scope.ramTotal = 0;
  $scope.hddUsed = 0;
  $scope.hddTotal = 0;
  $scope.cpuValue = 0;
  $scope.ramValue = 0;
  $scope.hddValue = 0;

  $scope.services = [];

  $scope.updateProviderOverview = function() {
    $http({
      method: 'GET',
      url: '/Provider'
    }).then(function successCallback(response) {
      $scope.cpuUsed = response.data.cpuLimit;
      $scope.cpuTotal = response.data.cpuMachine;
      $scope.ramUsed = response.data.memorylimit;
      $scope.ramTotal = response.data.memoryMachine;
      $scope.hddUsed = response.data.storageLimit;
      $scope.hddTotal = response.data.storageMachine;
      $scope.cpuValue = response.data.cpuCurrent;
      $scope.ramValue = response.data.memoryCurrent;
      $scope.hddValue = response.data.storageCurrent;
    }, function errorCallback(response) {
      console.log(response);
      console.log("Error while calling the update services view function.");
    });
  };

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
      $mdDialog.hide();
    };
  }

  $scope.availableImages = function(ev) {
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
      $mdDialog.hide();
    };
  }

  $scope.nodes = function(ev) {
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
      $mdDialog.hide();
    };
  }

  $(function() {
    $scope.updateProviderOverview();
    setInterval($scope.updateProviderOverview, 60000);
  });
});
