(function() {
  'use strict';

  angular
    .module('app')
    .factory('NavService', NavService);

  NavService.$inject = ['$rootScope'];


  function NavService($rootScope) {
    return {
      toggleNav: toggleNav
    };

    function toggleNav() {
      $rootScope.isNavActive = !$rootScope.isNavActive;
      angular.element(document.querySelector('html')).toggleClass('has-nav-opened');
      if ($rootScope.isNavActive === true) {

        TweenMax.staggerFrom('.c-nav__item', 1, {
          scale: 0.9,
          opacity: 0,
          delay: 0.2,
          ease: Elastic.easeOut,
          force3D: true
        }, 0.2);

        TweenMax.staggerFrom('.c-footer__item--nav', 1, {
          scale: 0,
          delay: 0.2,
          ease: Elastic.easeOut,
          force3D: true
        }, 0.2);
      }
    }
  }
})();
