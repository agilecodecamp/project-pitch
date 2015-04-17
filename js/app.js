(function (angular) {
	var app = angular.module('ppApp', ['ui.router', 'firebase']);

	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
	    .state('home', {
	      url: "/home",
	      templateUrl: "partials/home.html",
	      controller: 'homeCtrl'
	    })
	    .state('create', {
	      url: "/create",
	      templateUrl: "partials/create.html",
	      controller: 'createCtrl'
	    })
	    .state('project', {
	      url: "/project/:id",
	      templateUrl: "partials/project.html",
	      controller: 'projectCtrl'
	    })
	    .state('edit', {
	      url: "/edit/:id",
	      templateUrl: "partials/create.html",
	      controller: 'updateProjectCtrl'
	    });

	  $urlRouterProvider.otherwise("home");
	}]);

})(angular);