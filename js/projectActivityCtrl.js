(function (angular) {
	var app = angular.module('ppApp');
	
	app.controller('projectActivityCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

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
			var post = {
				content: content,
				createAt: Firebase.ServerValue.TIMESTAMP
			};

			if (addUrl && imgUrl) {
				post.imgUrl = imgUrl;
			}

			$scope.posts
				.$add(post)
				.then(function (ref) {
					$scope.content = '';
					$scope.img.url = '';
					$scope.img.show = false;
				});
		};

		$scope.deletePost = function (item) {
			// $scope.posts
			// 	.$remove(item);
		};

	}]);

})(angular);