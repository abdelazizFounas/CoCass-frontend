/*
 * CoCaas - Swarm
 * /Services/alldelete
 * /Services/delete -> nameservice
 * /Containers/delete -> nameservicedocker
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerClient", function ($scope, $mdDialog, $http, growl, $interval) {
  $scope.client();

  $scope.numberServices = 0;
  $scope.numberContainers = 0;
  $scope.numberImages = 0;
  $scope.numberMachines = 0;

  $scope.demand_ressource = function(ev) {
    $mdDialog.show({
      controller: DemandRessourceController,
      scope: this,
      preserveScope: true,
      templateUrl: 'html/demand-ressource.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
  };

  function DemandRessourceController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(name_service,image_name,nb_replicat,list_ports,commande) {
      listports=list_ports.replace(/ /g,'').split(",").map(Number)
      $http({
        method: 'POST',
        url: '/Services/new',
        data: {
          name: name_service,
          nbReplicas: nb_replicat,
          image: image_name,
          commande: commande,
          bindPorts: list_ports
        }
      }).then(function successCallback(response) {
        growl.success("Création du service " + name_service + " réussie!",{title: 'Succès !', ttl: 3000});
        $mdDialog.hide();
      }, function errorCallback(response) {
        growl.error("Création du service échouée",{title: 'Erreur !', ttl: 3000});
      });
    };
  }

  $scope.remove_all_services = function(event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      $http({
        method: 'POST',
        url: '/Services/alldelete'
      }).then(function successCallback(response) {
        growl.success("Suppression des services réussie!",{title: 'Succès !', ttl: 3000});
      }, function errorCallback(response) {
        growl.error("Suppression des services non réussie.",{title: 'Erreur !', ttl: 3000});
      });
  };

  $scope.scale_service = function(index, event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      console.log(index);
  };

  $scope.delete_service = function(index, event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      $http({
        method: 'POST',
        url: '/Services/delete',
        data: {
          nameservice: $scope.services[index].serviceName
        }
      }).then(function successCallback(response) {
        growl.success("Suppression du service réussie!",{title: 'Succès !', ttl: 3000});
      }, function errorCallback(response) {
        growl.error("Suppression du service non réussie.",{title: 'Erreur !', ttl: 3000});
      });
  };

  $scope.delete_container = function(parentIndex, index, event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      $http({
        method: 'POST',
        url: '/Containers/delete',
        data: {
          nameservicedocker: $scope.services[parentIndex].services[index].NomService
        }
      }).then(function successCallback(response) {
        growl.success("Suppression du container réussie!",{title: 'Succès !', ttl: 3000});
      }, function errorCallback(response) {
        growl.error("Suppression du container non réussie.",{title: 'Erreur !', ttl: 3000});
      });
  };

  $scope.services = [{
      "replicas": "5",
      "serviceName": "test2",
      "services": [{
          "NomService": "a-test2-1",
          "commande": [
              "ping",
              "google.com"
          ],
          "datecreation": "2017-03-09T12:04:58.274487484Z",
          "ipMachine": "127.0.0.1",
          "nodeId": "pxdp401x0x3us01bi1do84auh",
          "nomImage": "alpine:latest@sha256:58e1a1bb75db1b5a24a462dd5e2915277ea06438c3f105138f97eb53149673c4",
          "nomMachine": "nyoce-HP-ProBook-450-G1",
          "ports": "{80,30,40}",
          "status": {
              "CompletedAt": "0001-01-01T00:00:00Z",
              "StartedAt": "0001-01-01T00:00:00Z"
          }
      }, {
          "NomService": "a-test2-2",
          "commande": [
              "ping",
              "google.com"
          ],
          "datecreation": "2017-03-09T12:04:59.839832158Z",
          "ipMachine": "127.0.0.1",
          "nodeId": "pxdp401x0x3us01bi1do84auh",
          "nomImage": "alpine:latest@sha256:58e1a1bb75db1b5a24a462dd5e2915277ea06438c3f105138f97eb53149673c4",
          "nomMachine": "nyoce-HP-ProBook-450-G1",
          "ports": "{80,30,40}",
          "status": {
              "CompletedAt": "0001-01-01T00:00:00Z",
              "StartedAt": "0001-01-01T00:00:00Z"
          }
      }, {
          "NomService": "a-test2-3",
          "commande": [
              "ping",
              "google.com"
          ],
          "datecreation": "2017-03-09T12:05:01.524325956Z",
          "ipMachine": "127.0.0.1",
          "nodeId": "pxdp401x0x3us01bi1do84auh",
          "nomImage": "alpine:latest@sha256:58e1a1bb75db1b5a24a462dd5e2915277ea06438c3f105138f97eb53149673c4",
          "nomMachine": "nyoce-HP-ProBook-450-G1",
          "ports": "{80,30,40}",
          "status": {
              "CompletedAt": "0001-01-01T00:00:00Z",
              "StartedAt": "0001-01-01T00:00:00Z"
          }
      }, {
          "NomService": "a-test2-4",
          "commande": [
              "ping",
              "google.com"
          ],
          "datecreation": "2017-03-09T12:05:05.291177797Z",
          "ipMachine": "127.0.0.1",
          "nodeId": "pxdp401x0x3us01bi1do84auh",
          "nomImage": "alpine:latest@sha256:58e1a1bb75db1b5a24a462dd5e2915277ea06438c3f105138f97eb53149673c4",
          "nomMachine": "nyoce-HP-ProBook-450-G1",
          "ports": "{80,30,40}",
          "status": {
              "CompletedAt": "0001-01-01T00:00:00Z",
              "StartedAt": "0001-01-01T00:00:00Z"
          }
      }, {
          "NomService": "a-test2-5",
          "commande": [
              "ping",
              "google.com"
          ],
          "datecreation": "2017-03-09T12:05:06.891237664Z",
          "ipMachine": "127.0.0.1",
          "nodeId": "pxdp401x0x3us01bi1do84auh",
          "nomImage": "alpine:latest@sha256:58e1a1bb75db1b5a24a462dd5e2915277ea06438c3f105138f97eb53149673c4",
          "nomMachine": "nyoce-HP-ProBook-450-G1",
          "ports": "{80,30,40}",
          "status": {
              "CompletedAt": "0001-01-01T00:00:00Z",
              "StartedAt": "0001-01-01T00:00:00Z"
          }
      }]
  }];

  $scope.updateServicesView = function() {
    $http({
      method: 'GET',
      url: '/User/services'
    }).then(function successCallback(response) {
      $scope.services = response.data.services;

      $scope.numberServices = 0;
      $scope.numberContainers = 0;
      $scope.numberImages = 0;
      $scope.numberMachines = 0;

      var arrayImages = [];
      var arrayIP = [];

      angular.forEach($scope.services, function(service) {
        $scope.numberServices++;
        angular.forEach(service.services, function(container) {
          $scope.numberContainers++;
          container.nomImage = container.nomImage.split('@')[0];
          if (arrayImages.indexOf(container.nomImage) < 0) {
            arrayImages.push(container.nomImage);
          }
          if (arrayIP.indexOf(container.ipMachine) < 0) {
            arrayIP.push(container.ipMachine);
          }
        });
      });

      $scope.numberImages = arrayImages.length;
      $scope.numberMachines = arrayIP.length;
    }, function errorCallback(response) {
      console.log(response);
      console.log("Error while calling the update services view function.");
    });
  }

  $(function() {
    angular.forEach($scope.services, function(service) {
      angular.forEach(service.services, function(container) {
        container.nomImage = container.nomImage.split('@')[0];
        container.datecreation = new Date(container.datecreation);
      });
    });
    $scope.updateServicesView();
    $interval($scope.updateServicesView, 5000);
  });

});
