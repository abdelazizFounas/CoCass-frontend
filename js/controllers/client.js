/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerClient", function ($scope, $mdDialog) {
  $scope.client();

  $scope.demand_ressource = function(ev) {
    $mdDialog.show({
      controller: LoginDialogController,
      scope: this,
      preserveScope: true,
      templateUrl: 'demand-ressource.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  };

  $scope.numberServices = 10;
  $scope.numberContainers = 1;
  $scope.numberImages = 4;
  $scope.numberMachines = 3;

  function LoginDialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(username, password) {
      console.log(username +" "+ password);
      $http({
        method: 'POST',
        url: '/AutomaticAuto/api/connexion/connexion',
        data: {
          mail: username,
          pwd: password
        }
      }).then(function successCallback(response) {
        console.log("CONNECTED");
        console.log(response);
        $scope.connectionInfo.connected = true;
        $scope.connectionInfo.firstname = response.data.firstName;
        $scope.connectionInfo.lastname = response.data.lastName;
        growl.success("Vous êtes connecté.",{title: 'Succès !', ttl: 3000});
        $mdDialog.hide();
      }, function errorCallback(response) {
        console.log("NOT CONNECTED");
        console.log(response);
        growl.error("Mauvais mail ou mot de passe.",{title: 'Erreur !', ttl: 3000});
      });
    };
  }
});

