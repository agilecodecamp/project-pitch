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

		$scope.getTitle = function (name) {
			var user = $scope.user;
			if (name === 'Join ?') {
				return "join";
			} else if (user && name === user[user.provider].displayName) {
				return 'leave';
			} else {
				return '';
			}
		};

		$scope.wantJoin = function (index) {
			var user = $scope.user;
			if (!user) {
				return;
			}

			// you are founder, not join self project
			if (user.uid === $scope.Datas.uid) {
				return;
			}

			var username = user[user.provider].displayName;

			var partners = $scope.partners;
			var item = partners[index];

			// click on not join item and you are not this guy
			if (item.name !== 'Join ?' && username !== item.name) {
				return;
			}

			// find you is in project or not
			var search = partners.findIndex(function (data) {
				return data.name === username;
			});
			if (search !== -1) {
				// you are in project
				item.uid = "";
				item.name = "Join ?";
			} else {
				// join project
				item.uid = user.uid;
				item.name = username;
			}

			// save to firebase
			$scope.partners.$save(index)
				.catch(function (error) {
				});
		};
	}]);

})(angular);