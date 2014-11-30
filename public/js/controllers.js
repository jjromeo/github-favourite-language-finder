var app = angular.module('githubsearch', []);

app.controller('SearchController', ['$scope','$q', 'Github', function SearchController($scope, $q, Github) {
    $scope.language_objects = new Array;
    $scope.executeSearch = function executeSearch() {
        $scope.grabLanguages = function(url, callback) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            Github.findUser($scope.query, function (error, data) {
               if (!error) {
                   $scope.user = data;
                   Github.getUrl(data.repos_url, function(error, data) {
                       $scope.repos = data;
                       promise.then(function() {
                           $scope.repos.forEach(function(object, index) {
                               var languages_url = object.languages_url
                               Github.getUrl(languages_url, function(error, data) {
                                   $scope.language_objects.push(data);
                               });
                           });
                       }).then(function() {
                           console.log($scope.language_objects)
                           callback($scope.language_objects);
                       });
                       deferred.resolve();
                   });
               }
           });
        }
        $scope.grabLanguages("bla-bla", function(objects) {
            console.log(objects);
        })
    }
}])

app.factory('Github', function Github($http) {
    return {
        findUser: function findUser(query, callback) {
            $http.get('https://api.github.com/users/' + query )
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (e) {
                    callback(e);
                });
        },
        getUrl: function getUrl(url, callback) {
            $http.get(url)
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (e) {
                    callback(e);
                });
        }
        
    };
});


