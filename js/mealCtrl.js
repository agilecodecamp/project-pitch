(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('mealCtrl', ['$scope', '$state', '$firebaseArray', '$firebaseObject', function ($scope, $state, $firebaseArray, $firebaseObject) {

		var meal = $firebaseObject(new Firebase('https://platfone.firebaseio.com/meal'));

		meal
			.$loaded(function (mealData) {
				$scope.meal = mealData;

				$firebaseArray(mealData.$ref().child('persons'))
					.$loaded(function (persons) {
						$scope.persons = persons;
					});
				
			});

		$scope.addMe = function () {
			if (!$scope.user) {
				alert('You need login first.');
				return;
			}

			var searchIndex = $scope.persons.findIndex(function (data) {
				return data.uid === $scope.user.uid;
			});

			if (searchIndex === -1) {
				$scope.persons
					.$add({
						uid: $scope.user.uid
					});
			}
		};

	}]);

})(angular);