(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('projectActivityCtrl', ['$scope', '$state', '$firebaseArray', function ($scope, $state, $firebaseArray) {

		var ref = new Firebase('https://project-pitch.firebaseio.com/projects/' + $scope.projectID + '/posts');

		$scope.img = {
			show: false,
			url: ''
		};

		$firebaseArray(ref)
			.$loaded(function (data) {
				$scope.posts = data;
			});

		$scope.toggleImageUrls = function () {
			$scope.img.show = !$scope.img.show;
		};

		$scope.addPost = function (content, imgUrl, addUrl) {
			if (addUrl && imgUrl) {
				post.imgUrl = imgUrl;
			}

			var post = {
				content: content,
				createAt: Firebase.ServerValue.TIMESTAMP
			};

			$scope.posts
				.$add(post)
				.then(function (ref) {
					$scope.content = '';
					$scope.img.url = '';
					$scope.img.show = false;
				});
		};

		$scope.deletePost = function (item) {
			$scope.posts
				.$remove(item);
		};

	}]);

})(angular);