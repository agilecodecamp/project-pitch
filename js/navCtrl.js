(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('navCtrl', ['$scope', '$state', '$rootScope', '$firebaseAuth', function ($scope, $state, $rootScope, $firebaseAuth) {

		var ref = new Firebase('https://project-pitch.firebaseio.com');
    $scope.authObj = $firebaseAuth(ref);

    var authUser = $scope.authObj.$getAuth();

		$rootScope.user = authUser;

		if (authUser) {
			$scope.loginTitle = authUser[authUser.provider].displayName;
		} else {
			$scope.loginTitle = 'Login';
		}

		$scope.doLogin = function () {
			if (!$rootScope.user) {
				$scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
					$rootScope.user = authData;
					$scope.loginTitle = authData.facebook.displayName;
				}).catch(function(error) {
				  console.error("Authentication failed:", error);
				  $scope.loginTitle = 'Login';
				});
			}
		};

		$scope.doLogout = function () {
			$scope.authObj.$unauth();
			$rootScope.user = null;
			$scope.loginTitle = 'Login';
			$state.go('home');
		};

	}]);

})(angular);