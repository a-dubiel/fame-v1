(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$rootScope', 'NavService'];

  /* @ngInject */
  function MainController($scope, $rootScope, NavService) {
    var vm = this;
    $rootScope.isNavActive = false;
    vm.toggleNav = NavService.toggleNav;
    vm.isSunUp = false;

    angular.element(document).ready(function() {
      $scope.$apply(function() {
        vm.isSunUp = true;
      });
    });

  }
})();
