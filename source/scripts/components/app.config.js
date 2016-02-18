(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $state, $rootScope, $document, $injector) {

    $stateProvider
      .state('about', {
        url: '/about',
        onEnter: function($document) {
          scrollToElement($document, 'about');
        }
      })

    .state('services', {
      url: '/services',
      onEnter: function($document) {
        scrollToElement($document, 'services');
      }
    })

    .state('contact', {
      url: '/contact',
      onEnter: function($document) {
        scrollToElement($document, 'contact');
      }
    })

    .state('project', {
      url: '/work/:slug',
      views: {
        project: {
          templateUrl: 'project.html'
        }
      },
      controller: 'ProjectController'
    })

    .state('work', {
      url: '/work',
      onEnter: function($document) {
        scrollToElement($document, 'work');
      }
    })

    .state('home', {
      url: '',
      onEnter: function($document) {
        scrollToElement($document, 'home');
      }
    })

    .state('404', {
      templateUrl: '404.html',
      url: '404'
    });

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('404', null, {
        location: false
      });
    });

    //$locationProvider.html5Mode(true);

    function scrollToElement($document, id) {
      var html = angular.element(document.querySelector('html')).removeClass('has-nav-opened');
      var el = angular.element(document.getElementById(id));
      $document.scrollToElementAnimated(el, 50);
    }
  }
})();
