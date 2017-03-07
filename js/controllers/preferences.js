/*
 * CoCaas - Swarm
 */

cocaas_app = angular.module('cocaasapp');

cocaas_app.controller("controllerPreferences", function ($scope, $http, growl) {
  $scope.preferences();

  $scope.newpwd1 = "";
  $scope.newpwd2 = "";
  $scope.pwd1 = "";

  $scope.changePassword = function(){
    $http({
      method: 'POST',
      url: '/User/modifypassword',
      data: {
        newpassword: $scope.newpwd1,
        oldpassword: $scope.pwd1
      }
    }).then(function successCallback(response) {
      $scope.newpwd1 = "";
      $scope.newpwd2 = "";
      $scope.pwd1 = "";
      growl.success("Mot de passe modifié avec succès.",{title: 'Succès !', ttl: 2000});
    }, function errorCallback(response) {
      console.log(response);
      $scope.pwd1 = "";
      growl.error("Mot de passe non modifié.",{title: 'Erreur !', ttl: 2000});
    });
  };

});
