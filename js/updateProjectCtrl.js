(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('updateProjectCtrl', ['$scope', '$firebaseObject', '$rootScope', '$state', '$stateParams', function ($scope, $firebaseObject, $rootScope, $state, $stateParams) {

		$scope.buttonPrimary = "Save";

		$scope.projectID = $stateParams.id;

		if (!$scope.user || !$scope.projectID) {
			$state.go('home');
		}

		var ref = new Firebase('https://platfone.firebaseio.com/projects/' + $scope.projectID);

		var project = $firebaseObject(ref);

		project
			.$loaded(function (data) {
				// data not found, go home page
				if (data.$value === null) {
					$state.go('home');
					return;
				}
				$scope.Datas = data;
			});

		$scope.submitForm = function () {

			if ($scope.user.uid !== project.uid) {
				$state.go('home');
			}

			project
				.$save()
				.then(function (ref) {
					$state.go('project.profile', {
						id: $scope.projectID
					}, {
						location: 'replace'
					});
				});
		};

		$scope.clickCancel = function () {
			$state.go('project.profile', {
				id: $scope.projectID
			}, {
				location: 'replace'
			});
		};
	}]);

})(angular);
