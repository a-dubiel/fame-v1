(function() {
  'use strict';

  angular
    .module('app')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$http', '$document', '$rootScope', '$location'];

  /* @ngInject */
  function ProjectService($http, $document, $rootScope, $location) {
    return {
      getProjects: getProjects,
      openProject: openProject,
      closeProject: closeProject
    };

    function getProjects() {
      return $http.get('../data/projects.json')
        .then(getProjectsComplete)
        .catch(getProjectsFailed);

      function getProjectsComplete(response) {
        return response.data.projects;
      }

      function getProjectsFailed(error) {
        console.log('XHR Failed for getProject.' + error.data);
      }
    }


    function openProject(el) {
      var tl = new TimelineMax();
      var content = angular.element(el.children().children()[1]);
      var cover = angular.element(el.children()[0]);

      $document.scrollToElementAnimated(el, 0).then(function() {

        el.addClass('is-sticky');
        angular.element(document.querySelector('html')).toggleClass('has-project-opened');

        tl.to(content, 0.2, {
          opacity: 0,
          x: -500,
          ease: Expo.easeOut
        });

        tl.to(cover, 0.7, {
          opacity: 0,
          scale: 1.2,
          ease: Expo.easeOut
        });

        tl.to(el, 0.2, {
          height: '100%',
          ease: Linear.easeIn
        }, '-=0.9');

        tl.to('.c-portfolio__close', 1, {
          scale: 1,
          ease: Elastic.easeOut
        });

        tl.to('.c-portfolio__information', 0.3, {
          opacity: 1,
          scale: 1,
          ease: Linear.easeIn
        }, '-=0.7');

        tl.to('.c-portfolio__screens, .c-portfolio__bottom', 0.5, {
          opacity: 1,
          y: 0,
          ease: Linear.easeIn
        });


      });
    }

    function closeProject(slug) {

      if (slug) {

        var el = angular.element(document.querySelector('.c-portfolio__item--' + slug));
        var html = angular.element(document.querySelector('html')).toggleClass('has-project-opened');
        var tl = new TimelineMax();
        var content = angular.element(el.children().children()[1]);
        var cover = angular.element(el.children()[0]);

        el.removeClass('is-sticky');

        tl.to(el, 0.3, {
          height: 450,
          ease: Circ.easeIn
        });

        tl.to(content, 0.2, {
          opacity: 1,
          x: 0,
          ease: Expo.easeOut
        });

        tl.to(cover, 0.2, {
          opacity: 1,
          scale: 1,
          x: '-50%',
          ease: Expo.easeOut
        });

        $document.scrollToElementAnimated(el, 50);
        $rootScope.activeProject = false;
        $location.url('/');
      }

    }

  }
})();
