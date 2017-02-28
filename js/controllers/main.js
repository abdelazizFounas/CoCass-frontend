/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp', ['ngRoute', 'ngMaterial', 'angular-growl', 'angularjs-gauge']);

cocaas_app.controller("controllerMain", function ($scope, $mdDialog, $location) {
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  $scope.connect = function(ev) {
    $mdDialog.show({
      controller: LoginDialogController,
      scope: this,
      preserveScope: true,
      templateUrl: 'login-dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  $scope.createAcc = function(ev) {
    $mdDialog.show({
      controller: CreateDialogController,
      scope: this,
      preserveScope: true,
      templateUrl: 'create-dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

  function CreateDialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(firstname, lastname, mail, password) {
      console.log(firstname +" "+ lastname  +" "+  mail +" "+ password);

      $http({
        method: 'POST',
        url: '/AutomaticAuto/api/connexion/newAccount',
        data: {
          email: mail,
          firstName: firstname,
          lastName: lastname,
          passwdHash: password
        }
      }).then(function successCallback(response) {
        console.log("NEW ACCOUNT");
        console.log(response);
        $scope.connectionInfo.connected = true;
        $scope.connectionInfo.firstname = firstname;
        $scope.connectionInfo.lastname = lastname;
        growl.success("Le compte a été créé.",{title: 'Succès !', ttl: 3000});
        $mdDialog.hide();
      }, function errorCallback(response) {
        console.log("NO NEW ACCOUNT");
        console.log(response);
        growl.error("Le compte n'a pas été créé.",{title: 'Erreur !', ttl: 3000});
      });
    };
  }

  function LoginDialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(username, password) {
      console.log(username +" "+ password);
      if(username === "essai" && password === "essai"){
        $scope.connectionInfo.connected = true;
        $scope.connectionInfo.firstname = username;
        $scope.connectionInfo.lastname = password;
        growl.success("Vous êtes connecté.",{title: 'Succès !', ttl: 3000});
        $mdDialog.hide();
      }
      /*
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
      });*/
    };
  }

  $scope.connectionInfo = {
    connected: true
  };

  $scope.disconnect = function(e){
    $scope.connectionInfo.connected = false;

    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);

    if(pgurl == "client" || pgurl == "preferences" || pgurl == "provider"){
      $location.path("/about");
    }
  };

  $scope.client = function(){
    removeActiveClass();
    $scope.classClient = "active";
  };

  $scope.provider = function(){
    removeActiveClass();
    $scope.classProvider = "active";
  };

  $scope.preferences = function(){
    removeActiveClass();
    $scope.classPreferences = "active";
  };

  $scope.about = function(){
    removeActiveClass();
    $scope.classAbout = "active";
  };

  removeActiveClass = function(){
    $scope.classClient = "";
    $scope.classProvider = "";
    $scope.classPreferences = "";
    $scope.classAbout = "";
  };

  $(function() {
     var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);

     if(pgurl == "client"){
       if($scope.connectionInfo.connected == false){
         $location.path("/about");
       }
       else{
         $scope.client();
       }
     }
     else if(pgurl == "provider"){
       if($scope.connectionInfo.connected == false){
         $location.path("/about");
       }
       else{
         $scope.provider();
       }
     }
     else if(pgurl == "preferences"){
       if($scope.connectionInfo.connected == false){
         $location.path("/about");
       }
       else{
         $scope.preferences();
       }
     }
     else if(pgurl == "about"){
       $scope.about();
     }

     $scope.$on( "$routeChangeStart", function(event, next, current) {
       if ( $scope.connectionInfo.connected == false ) {
         if ( next.templateUrl == "client.html" || next.templateUrl == "provider.html" || next.templateUrl == "preferences.html" ) {
           $location.path("/about");
         }
       }
     });
  });
}).config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
      .when('/client', {
          templateUrl: 'client.html',
          controller: 'controllerClient'
      }).when('/provider', {
          templateUrl: 'provider.html',
          controller: 'controllerProvider'
      }).when('/preferences', {
          templateUrl: 'preferences.html',
          controller: 'controllerPreferences'
      }).when('/about', {
          templateUrl: 'about.html',
          controller: 'controllerAbout'
      }).otherwise({
          redirectTo: '/about'
      });
    }
]);
