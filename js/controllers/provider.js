/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerProvider", function ($scope, $mdDialog) {
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

  $scope.usersContainers = function(ev) {
    $scope.mdDialogOpenned = 1;

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

    $scope.test = function(index, event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      console.log(index);
    };

    $scope.groups = [
      {
        title: 'Service : toto.titi',
        content: 'Tous les containers de toto.titi',
        table: [{
          name: 'toto.titi.1',
          ip: '192.168.1.2',
          ports: '80:760, 47:679'
        },{
          name: 'toto.titi.2',
          ip: '192.168.1.2',
          ports: '80:760, 47:679'
        }
        ]
      },
      {
        title: 'Service : toto.tata',
        content: 'Tous les containers de toto.tata',
        table: [{
          name: 'toto.tata.1',
          ip: '192.168.1.2',
          ports: '80:760, 47:679'
        },{
          name: 'toto.tata.1',
          ip: '192.168.1.2',
          ports: '80:760, 47:679'
        }
        ]
      }
    ];
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
