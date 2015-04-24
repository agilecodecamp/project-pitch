(function (angular) {
	var app = angular.module('ppApp', ['ui.router', 'firebase']);

	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "partials/home.html",
	      controller: 'homeCtrl'
	    })
	    .state('create', {
	      url: "/create",
	      templateUrl: "partials/create.html",
	      controller: 'createCtrl'
	    })
	    .state('project', {
	    	abstract: true,
	      url: "/project/:id",
	      templateUrl: "partials/project.html",
	      controller: 'projectCtrl'
	    })
	    .state('project.profile', {
	    	url: '/profile',
	    	templateUrl: 'partials/project-profile.html'
	    })
	    .state('project.activity', {
	    	url: '/activity',
	    	templateUrl: 'partials/project-activity.html',
	    	controller: 'projectActivityCtrl'
	    })
	    .state('edit', {
	      url: "/edit/:id",
	      templateUrl: "partials/create.html",
	      controller: 'updateProjectCtrl'
	    })
	    .state('lunch', {
	      url: "/lunch",
	      templateUrl: "partials/lunch.html",
	      controller: 'mealCtrl'
	    });

	  $urlRouterProvider.otherwise("/");
	}]);

})(angular);