/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerClient", function ($scope, $mdDialog, $http, growl) {
  $scope.client();

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

  $scope.modi_list_ressource = function(index, event) {
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }
  }

    $scope.accordionConfig = {
    debug: false,
    animDur: 300,
    expandFirst: false,
    autoCollapse: true,
    watchInternalChanges: false,
    headerClass: '',
    beforeHeader: '',
    afterHeader: '<div class="drop-icon-wrapper sir-accordion-vertical-align"><i class="glyphicon glyphicon-chevron-down"></i></div>',
    topContentClass: '',
    beforeTopContent: '',
    afterTopContent: '<div><p><small>I repeat through all accordion</small></p></div>',
    bottomContentClass: '',
    beforeBottomContent: '',
    afterBottomContent: ''
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


  $scope.numberServices = 10;
  $scope.numberContainers = 1;
  $scope.numberImages = 4;
  $scope.numberMachines = 3;

  /*$scope.opt_images = [
    { id: 1, name: 'Ubuntu' },
    { id: 2, name: 'Debian' },
    { id: 3, name: 'MySQL' }
  ];
  $scope.image_type = { id: 1, name: 'Ubuntu' };*/

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
          nbReplicas: image_name,
          image: nb_replicat,
          commande: commande,
          bindPorts: list_ports
        }
      }).then(function successCallback(response) {
        growl.success("Création du service " + name_service + " réussie!",{title: 'Succès !', ttl: 3000});
        
      }, function errorCallback(response) {
        growl.error("Création du service échouée",{title: 'Erreur !', ttl: 3000});

      });
    };
  }
});

