var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.setType = function (type) {
    $scope.items = window.data[type];
    $scope.type = type;
    switch (type) {
      case 'incidents':
        $scope.header = "Incidents";
        break;
      case 'crs':
        $scope.header = "Change Requests";
        break;
    }
  }

  $scope.setType('incidents');
}]);

app.config(function ($mdThemingProvider) {
  var background = $mdThemingProvider.extendPalette('grey', {
    'A100': 'f7f7f7'
  });
  $mdThemingProvider.definePalette('background', background);

  $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('blue-grey').backgroundPalette('background');
});
