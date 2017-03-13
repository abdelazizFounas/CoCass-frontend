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
  $scope.serviceToScale = "";
  $scope.nbContainersServiceToScale = 0;

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
        $scope.updateServicesView();
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
        $scope.updateServicesView();
      }, function errorCallback(response) {
        growl.error("Suppression des services non réussie.",{title: 'Erreur !', ttl: 3000});
      });
  };

  $scope.scale_service = function(index, event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      $scope.serviceToScale = $scope.services[index].serviceName;
      $scope.nbContainersServiceToScale = $scope.services[index].services.length;

      $mdDialog.show({
        controller: ScaleServiceController,
        scope: this,
        preserveScope: true,
        templateUrl: 'html/scale-service.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      });
  };

  function ScaleServiceController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(nb_replicat) {
      $http({
        method: 'POST',
        url: '/Services/scale',
        data: {
          serviceName: $scope.serviceToScale,
          replicas: nb_replicat
        }
      }).then(function successCallback(response) {
        growl.success("Scale du service " + $scope.serviceToScale + " de " + $scope.nbContainersServiceToScale + " à " + nb_replicat + " réplicats réussie !",{title: 'Succès !', ttl: 3000});
        $mdDialog.hide();
        $scope.updateServicesView();
      }, function errorCallback(response) {
        growl.error("Scale du service échouée.",{title: 'Erreur !', ttl: 3000});
      });
    };
  }

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
        $scope.updateServicesView();
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
        $scope.updateServicesView();
      }, function errorCallback(response) {
        growl.error("Suppression du container non réussie.",{title: 'Erreur !', ttl: 3000});
      });
  };

  $scope.services = [];

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
    $scope.updateServicesView();
  });

});
