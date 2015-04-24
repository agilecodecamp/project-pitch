(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('homeCtrl', ['$scope', '$state', '$firebaseArray', function ($scope, $state, $firebaseArray) {

		var list = $firebaseArray(new Firebase('https://platfone.firebaseio.com/projects'));

		list
			.$loaded(function (list) {
				$scope.projects = list;
			});

		$scope.goProject = function (id) {
			$state.go('project.profile', {
				id: id
			});
		};

	}]);

})(angular);