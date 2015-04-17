(function () {
	var app = angular.module('ppApp');
	app.directive('projectQuestion', [function () {
		return {
			restrict: 'E',
	    scope: {
	      project: '='
	    },
			templateUrl: 'partials/project-question.html'
		};
	}]);

})();