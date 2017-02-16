/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerPreferences", function ($scope, $http, growl) {
  $scope.preferences();

  $scope.user = {};

  $scope.mail = "";
  $scope.pwd1 = "";

  $scope.newpwd1 = "";
  $scope.newpwd2 = "";
  $scope.pwd2 = "";

  $(function() {
    $http({
      method: 'GET',
      url: '/AutomaticAuto/api/connexion/checkConnexion'
    }).then(function successCallback(response) {
      console.log(response);
      $scope.user = response.data;

      $scope.mail = $scope.user.email;
    }, function errorCallback(response) {
      console.log(response);
    });
  });

  $scope.changeMail = function(){
    $http({
      method: 'POST',
      url: '/AutomaticAuto/api/account/changeMail',
      data: {
        infobean: $scope.mail,
        password: $scope.pwd1
      }
    }).then(function successCallback(response) {
      console.log(response);
      if(response.data.taxiPresent){
        $scope.user.email = $scope.mail;
        $scope.pwd1 = "";
        growl.success("Mail modifié avec succès.",{title: 'Succès !', ttl: 2000});
      }
      else{
        $scope.mail = $scope.user.email;
        growl.error("Mail non modifié.",{title: 'Erreur !', ttl: 2000});
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.changePassword = function(){
    $http({
      method: 'POST',
      url: '/AutomaticAuto/api/account/changePassword',
      data: {
        infobean: $scope.newpwd1,
        password: $scope.pwd2
      }
    }).then(function successCallback(response) {
      console.log(response);
      if(response.data.taxiPresent){
        $scope.newpwd1 = "";
        $scope.newpwd2 = "";
        $scope.pwd2 = "";
        growl.success("Mot de passe modifié avec succès.",{title: 'Succès !', ttl: 2000});
      }
      else{
        $scope.pwd2 = "";
        growl.error("Mot de passe non modifié.",{title: 'Erreur !', ttl: 2000});
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  };
});
