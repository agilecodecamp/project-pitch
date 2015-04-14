(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('projectCtrl', ['$scope', '$state', '$stateParams', '$firebaseObject', '$firebaseArray', function ($scope, $state, $stateParams, $firebaseObject, $firebaseArray) {

		$scope.projectID = $stateParams.id;

		var list = $firebaseObject(new Firebase('https://project-pitch.firebaseio.com/projects/' + $scope.projectID));

		list
			.$loaded(function (data) {
				if (data.$value === null) {
					$scope.notFound = {};
				} else {
					$scope.notFound = null;

					$scope.Datas = data;
					
					// load partners
					var partners = $firebaseArray(data.$ref().child('partners'));
					partners
						.$loaded(function (data) {
							$scope.partners = data;
						});
				}
			});

		$scope.goHome = function () {
			$state.go('home');
		};

		$scope.wantJoin = function (index) {
			var user = $scope.user;
			if (!user) {
				return;
			}

			var username = user[user.provider].displayName;

			// you are founder, not join self project
			if (username === $scope.Datas.createName) {
				return;
			}

			var partners = $scope.partners;
			var item = partners[index];

			// click on not join item
			if (item.$value !== 'Join ?') {
				return;
			}

			// find you is in project or not
			var search = partners.findIndex(function (data) {
				return data.$value === username;
			});

			// you are in project
			if (search !== -1) {
				return;
			}

			// join project
			item.$value = username;

			// save to firebase
			$scope.partners.$save(index)
				.catch(function (error) {
				});
		};
	}]);

})(angular);