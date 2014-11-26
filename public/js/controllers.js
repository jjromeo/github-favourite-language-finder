var app = angular.module('githubsearch', []);

app.controller('SearchController', ['$scope', 'Github', function SearchController($scope, Github) {
    $scope.language_objects = new Array;
    $scope.executeSearch = function executeSearch() {
       Github.findUser($scope.query, function (error, data) {
           if (!error) {
               $scope.user = data;
               Github.getUrl(data.repos_url, function(error, data) {
                   $scope.repos = data;
                   $scope.repos.forEach(function(object, index) {
                       var languages_url = object.languages_url
                       Github.getUrl(languages_url, function(error, data) {
                           $scope.language_objects.push(data);
                       });
                   });
               });
           }
       });
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


