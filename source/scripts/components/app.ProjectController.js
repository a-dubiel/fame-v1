(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['$rootScope', 'ProjectService', '$timeout', '$document', '$window', '$state', '$location'];

  /* @ngInject */
  function ProjectController($rootScope, ProjectService, $timeout, $document, $window, $state, $location) {
    var vm = this;
    vm.projects = [];
    vm.projectData;
    $rootScope.activeProject;
    vm.closeProject = ProjectService.closeProject;

    getProjects();

    function getProjects() {
      return ProjectService.getProjects()
        .then(function(data) {
          vm.projects = data;
          return vm.projects;
        });
    }



    function showProject(slug) {

      if (slug) {
        $rootScope.activeProject = slug;
        $timeout(function() {
          vm.projectData = vm.projects[slug];
          if (vm.projectData) {
            var el = angular.element(document.querySelector('.c-portfolio__item--' + slug));
            if (el.length) {
              ProjectService.openProject(el);
            }
          } else {
            $state.go('404');
          }

        }, 500);
      } else {
        $state.go('404');
      }

    }

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'project') {
          showProject(toParams.slug);
        }
        else if(fromState.name == 'project'){
          ProjectService.closeProject($rootScope.activeProject);
        }
      });

  }
})();
